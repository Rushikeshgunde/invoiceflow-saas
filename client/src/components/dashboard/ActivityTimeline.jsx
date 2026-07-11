import {
  FaFileInvoice,
  FaUserPlus,
  FaBoxOpen,
} from "react-icons/fa6";

import "../../styles/ActivityTimeline.css";

function ActivityTimeline({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="activity-card">
        <h3 className="activity-title">
          Recent Activity
        </h3>

        <p className="activity-empty">
          No recent activity found.
        </p>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case "invoice":
        return (
          <div className="activity-icon invoice">
            <FaFileInvoice />
          </div>
        );

      case "customer":
        return (
          <div className="activity-icon customer">
            <FaUserPlus />
          </div>
        );

      case "product":
        return (
          <div className="activity-icon product">
            <FaBoxOpen />
          </div>
        );

      default:
        return (
          <div className="activity-icon default">
            •
          </div>
        );
    }
  };

  return (
    <div className="activity-card">
      <h3 className="activity-title">
        Recent Activity
      </h3>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="activity-item"
          >
            {getIcon(activity.type)}

            <div className="activity-content">
              <h4 className="activity-heading">
                {activity.title}
              </h4>

              <p className="activity-time">
                {new Date(
                  activity.createdAt
                ).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;