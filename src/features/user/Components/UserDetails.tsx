import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "stores/store";
import { Button } from "../../../components/Elements/Button";
import { Spinner } from "../../../components/Elements/Spinner";
import InputField from "../../../components/Form/InputField";
import TextArea from "../../../components/Form/TextArea";
import { Author } from "../../posts/types/postType";
import {
  SettingsValidationSchema,
  settingsValidationSchema,
} from "../../posts/utils/settingSchema";
import updateProfile from "../api/updateUserProfile";

const getComputedDate = (dob: string = "") => {
  const dateObject = new Date(dob);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
type UserDetailsProps = {
  isOnboarding?: boolean;
};

const checkIfDetailsEmpty = (firstname: string, lastname: string) => {
  if (
    firstname.toLocaleLowerCase() === "john" &&
    lastname.toLocaleLowerCase() === "doe"
  ) {
    return false;
  }
  return true;
};
const UserDetails = ({ isOnboarding }: UserDetailsProps) => {
  const {
    control,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SettingsValidationSchema>({
    resolver: zodResolver(settingsValidationSchema),
  });
  const handleInputChange = async (field: keyof SettingsValidationSchema) => {
    await trigger(field);
  };
  const loggedInUser = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { t } = useTranslation();
  const { mutate, error, isLoading } = updateProfile(isOnboarding);
  const onSubmit: SubmitHandler<SettingsValidationSchema> = (data) => {
    mutate(data);
  };
  useEffect(() => {
    const handleFormValues = () => {
      setValue("bio", loggedInUser?.bio ?? "");
      setValue("location", loggedInUser?.location ?? "");
      setValue("phoneNumber", loggedInUser?.phoneNumber ?? "");
      setValue("dob", getComputedDate(loggedInUser?.dob));
      if (
        loggedInUser?.firstName === "John" &&
        loggedInUser?.lastName === "Doe"
      ) {
        setValue("firstName", "");
        setValue("lastName", "");
      } else {
        setValue("firstName", loggedInUser?.firstName ?? "");
        setValue("lastName", loggedInUser?.lastName ?? "");
      }
    };
    if (loggedInUser) {
      handleFormValues();
    }
  }, [loggedInUser]);
  if (!loggedInUser) {
    return <Spinner variant="primary" />;
  }

  return (
    <div className="container w-full p-4 mx-auto md:w-3/5 lg:w-1/2">
      <div className="p-6 bg-white rounded-lg ">
        <h1 className="mb-4 text-2xl font-semibold">User Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <InputField<SettingsValidationSchema>
            name="firstName"
            control={control}
            errors={errors}
            label={t("authPage.firstName")}
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.firstName}
          />

          <InputField<SettingsValidationSchema>
            name="lastName"
            control={control}
            errors={errors}
            label={t("authPage.lastName")}
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.lastName ? loggedInUser?.lastName : ""}
          />

          <TextArea<SettingsValidationSchema>
            name="bio"
            control={control}
            errors={errors}
            label={t("userPages.bio")}
            placeholder={t("userPages.enterBio")}
            type="text"
            defaultValue={loggedInUser?.bio ? loggedInUser?.bio : ""}
            onKeyDown={handleInputChange}
            className="h-[4rem]"
          />

          <InputField<SettingsValidationSchema>
            name="location"
            control={control}
            errors={errors}
            label={t("userPages.location")}
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.location}
          />
          <InputField<SettingsValidationSchema>
            name="dob"
            control={control}
            errors={errors}
            label={t("userPages.dob")}
            type="date"
            onKeyDown={handleInputChange}
            defaultValue={getComputedDate(loggedInUser?.dob)}
          />

          <InputField<SettingsValidationSchema>
            name="phoneNumber"
            control={control}
            errors={errors}
            label={t("userPages.phoneNumber")}
            type="number"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.phoneNumber}
          />

          <div className="flex items-center self-end justify-between mt-6 md:pr-2 gap-x-2">
            {isOnboarding &&
            checkIfDetailsEmpty(
              loggedInUser.firstName,
              loggedInUser.lastName
            ) ? (
              <Link to="/home" className="hover:underline">
                {t("userPages.returnHome")}{" "}
              </Link>
            ) : null}
            <Button type="submit" variant="blend">
              {t("userPages.save")}{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
