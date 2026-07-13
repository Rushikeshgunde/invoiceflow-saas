import { useNotification } from "../context/NotificationContext";
import NotificationItem from "../components/notifications/NotificationItem";

function Notifications() {
  const { notifications, loading, readNotification } = useNotification();

  if (loading) {
    return <div className="page-loader">Loading...</div>;
  }

  return (
    <section className="notifications-page">
      <div className="page-header">
        <h1>Notifications</h1>
        <p>View all notifications</p>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">No notifications available.</div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onClick={() => readNotification(notification._id)}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Notifications;
