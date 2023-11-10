import { Dialog } from "../../../components/Elements/Dialog";
import InputField from "../../../components/Form/InputField";
import React, { useEffect } from "react";
import {
  CommentValidationSchema,
  commentValidationSchema,
} from "../../../features/posts/Components/PostEngagements";
import { Button } from "../../../components/Elements/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    await trigger(field); // Trigger validation for the specified field
  };
  const { mutate, error } = updateGroupChatName();

  useEffect(() => {
    setValue("content", groupName);
  }, []);
  const onSubmit: SubmitHandler<CommentValidationSchema> = (data) => {
    console.log({ chatId, groupName: data.content });
  };

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
            Update Name
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export default EditGroupPostName;
