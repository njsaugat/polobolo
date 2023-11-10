import React, { useEffect } from "react";
import {
  SettingsValidationSchema,
  settingsValidationSchema,
} from "../../posts/utils/settingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/Form/InputField";
import { useSelector } from "react-redux";
import { RootState } from "stores/store";
import { Author } from "../../posts/types/postType";
import TextArea from "../../../components/Form/TextArea";
import updateProfile from "../api/updateUserProfile";
import { Button } from "../../../components/Elements/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "../../../components/Elements/Spinner";

function getComputedDate(dob: string = "") {
  const dateObject = new Date(dob);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
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
  // if(firstname && lastname && firstname)
};
const UserDetails = ({ isOnboarding }: UserDetailsProps) => {
  const {
    control,
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SettingsValidationSchema>({
    resolver: zodResolver(settingsValidationSchema),
  });
  const handleInputChange = async (field: keyof SettingsValidationSchema) => {
    await trigger(field); // Trigger validation for the specified field
  };
  const loggedInUser = useSelector<RootState, Author | undefined>(
    (store) => store.user.user
  );
  const { mutate, error, isLoading } = updateProfile(isOnboarding);
  const onSubmit: SubmitHandler<SettingsValidationSchema> = (data) => {
    mutate(data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      setValue("bio", loggedInUser.bio);
      setValue("location", loggedInUser.location);
      setValue("phoneNumber", loggedInUser.phoneNumber);
      setValue("dob", getComputedDate(loggedInUser?.dob));
      if (
        loggedInUser.firstName === "John" &&
        loggedInUser.lastName === "Doe"
      ) {
        setValue("firstName", "");
        setValue("lastName", "");
      } else {
        setValue("firstName", loggedInUser.firstName);
        setValue("lastName", loggedInUser.lastName);
      }
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
            label="First Name"
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.firstName}
          />

          <InputField<SettingsValidationSchema>
            name="lastName"
            control={control}
            errors={errors}
            label="Last Name"
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.lastName ? loggedInUser?.lastName : ""}
          />

          <TextArea<SettingsValidationSchema>
            name="bio"
            control={control}
            errors={errors}
            label="Bio"
            placeholder="Enter your Bio"
            type="text"
            defaultValue={loggedInUser?.bio ? loggedInUser?.bio : ""}
            onKeyDown={handleInputChange}
            className="h-[4rem]"
          />

          <InputField<SettingsValidationSchema>
            name="location"
            control={control}
            errors={errors}
            label="Location"
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={loggedInUser?.location}
          />
          <InputField<SettingsValidationSchema>
            name="dob"
            control={control}
            errors={errors}
            label="Date of birth"
            type="date"
            onKeyDown={handleInputChange}
            defaultValue={getComputedDate(loggedInUser?.dob)}
          />

          <InputField<SettingsValidationSchema>
            name="phoneNumber"
            control={control}
            errors={errors}
            label="Phone Number"
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
                Return Home
              </Link>
            ) : null}
            <Button type="submit" variant="blend">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
