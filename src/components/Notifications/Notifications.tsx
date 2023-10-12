import { useDispatch, useSelector } from "react-redux";
import { SingleNotification } from "./Notification";
import { RootState } from "stores/store";
import {
  Notification,
  dismissNotification,
} from "../../stores/notificationSlice";

export const Notifications = () => {
  const notifications = useSelector<RootState, Notification[]>(
    (store) => store.notification.notifications
  );
  const dispatch = useDispatch();
  const handleDismissNotification = (notification: Notification) => {
    dispatch(dismissNotification(notification));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end px-4 py-6 space-y-4 pointer-events-none sm:p-6 sm:items-start">
      {notifications.map((notification) => {
        console.log("first rendered");
        return (
          <SingleNotification
            key={notification.id}
            notification={notification}
            onDismiss={() => handleDismissNotification(notification)}
          />
        );
      })}
    </div>
  );
};
