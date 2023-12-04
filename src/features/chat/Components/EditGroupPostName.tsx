import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Elements/Button";
import { Dialog } from "../../../components/Elements/Dialog";
import InputField from "../../../components/Form/InputField";
import {
  CommentValidationSchema,
  commentValidationSchema,
} from "../../posts/Components/PostEngagements";
import updateGroupChatName from "../api/updateGroupChatName";

type EditGroupPostName = {
  chatId: string;
  closeModal: () => void;
  groupName: string;
};

const EditGroupPostName = ({
  chatId,
  closeModal,
  groupName,
}: EditGroupPostName) => {
  const {
    control,
    trigger,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<CommentValidationSchema>({
    resolver: zodResolver(commentValidationSchema),
  });
  const handleInputChange = async (field: keyof CommentValidationSchema) => {
    await trigger(field);
  };
  const { mutate, error } = updateGroupChatName();

  useEffect(() => {
    setValue("content", groupName);
  }, []);
  const onSubmit: SubmitHandler<CommentValidationSchema> = (data) => {};
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        isOpen={!!chatId}
        closeModal={closeModal}
        className="rounded-lg md:w-1/2 lg:w-1/3 deleteDialog "
        modalClassName=" mx-10"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField<CommentValidationSchema>
            name="content"
            control={control}
            errors={errors || error}
            placeholder=""
            label=""
            type="text"
            onKeyDown={handleInputChange}
            defaultValue={groupName}
          ></InputField>

          <Button
            type="submit"
            variant="blend"
            onClick={() => {
              mutate({ chatId, groupName: getValues("content") });
              closeModal();
            }}
          >
            {t("chatPage.updateGroupName")}
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export default EditGroupPostName;
