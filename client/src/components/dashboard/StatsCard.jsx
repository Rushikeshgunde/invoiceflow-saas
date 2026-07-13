import "../../styles/StatsCard.css";

function StatsCard({ title, value, icon, growth }) {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-icon">
          {icon}
        </div>

        {/* <span className="stats-growth">
          ↑ {growth}
        </span> */}
      </div>

      <h3>{value}</h3>

      <p>{title}</p>
    </div>

    
  );
}

export default StatsCard;