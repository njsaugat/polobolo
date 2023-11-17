import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { Fragment, useEffect } from "react";
import { Notification } from "stores/notificationSlice";

const icons = {
  info: (
    <InformationCircleIcon
      className="w-6 h-6 text-teal-900"
      aria-hidden="true"
    />
  ),
  success: (
    <CheckCircleIcon className="w-6 h-6 text-green-500" aria-hidden="true" />
  ),
  warning: (
    <ExclamationCircleIcon
      className="w-6 h-6 text-yellow-300"
      aria-hidden="true"
    />
  ),
  error: <XCircleIcon className="w-6 h-6 text-red-500" aria-hidden="true" />,
};

export type NotificationProps = {
  notification: Notification;
  onDismiss: () => void;
};

const notificationStyles = {
  success: "bg-green-500 text-white",
  info: "bg-blue-500 text-white",
  warning: "bg-yellow-500 text-black",
  error: "bg-red-500 text-white",
};

export const SingleNotification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  useEffect(() => {
    let interval = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center w-full space-y-4 font-sans sm:items-end">
      <Transition
        show={true}
        as={Fragment}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
          <div className="p-4" role="alert" aria-label={title}>
            <div className="flex items-start">
              <div className="flex-shrink-0">{icons[type]}</div>
              <div className="flex-1 w-0 pt-0 ml-3 5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="flex flex-shrink-0 ml-4">
                <button
                  className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => onDismiss()}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="w-5 h-5" aria-hidden="true"></XIcon>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`w-full h-1 overflow-hidden duration-1000 animate-grow whitespace-nowrap ${notificationStyles[type]}`}
          ></div>
        </div>
      </Transition>
    </div>
  );
};
