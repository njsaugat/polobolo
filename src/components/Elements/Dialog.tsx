import { Dialog as UIDialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Fragment } from "react";

type DialogProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  initialFocus?: React.MutableRefObject<null>;
  className?: string;
  modalClassName?: string;
};

export const DialogTitle = UIDialog.Title;

export const DialogDescription = UIDialog.Description;

export const Dialog = ({
  isOpen,
  closeModal,
  children,
  className,
  modalClassName,
}: DialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <UIDialog
        as="div"
        className={`relative font-montserrat ${
          className?.includes("delete") ? "z-50" : "z-10"
        }`}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`flex items-center justify-center min-h-full text-center md:p-1 lg:p-10 ${modalClassName} `}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <UIDialog.Panel
                className={`w-screen min-h-screen p-6 m-0  text-left align-middle transition-all transform bg-white shadow-xl lg:rounded md:w-full md:mt-2 md:min-h-full ${
                  className ? className : "overflow-hidden"
                }`}
              >
                {children}
              </UIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </UIDialog>
    </Transition>
  );
};
