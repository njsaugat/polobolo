import {
  ExclamationIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import * as React from "react";

import { Button } from "components/Elements/Button";
import { Dialog, DialogTitle } from "components/Elements/Dialog";
import { useDisclosure } from "hooks/useDisclosure";

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: "danger" | "info";
  isDone?: boolean;
};

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = "",
  cancelButtonText = "Cancel",
  icon = "danger",
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure();

  const cancelButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            {icon === "danger" && (
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationIcon
                  className="w-6 h-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
            )}
            {icon === "info" && (
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <InformationCircleIcon
                  className="w-6 h-6 text-blue-600"
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </DialogTitle>
            </div>
            {body && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">{body}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              type="button"
              variant="inverse"
              className="inline-flex justify-center w-full border rounded-md focuse:ring-1 focus:ring-offset-1 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={close}
              ref={cancelButtonRef}
            >
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </div>
      </Dialog>
    </>
  );
};
