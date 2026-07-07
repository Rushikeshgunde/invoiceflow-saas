import StatsCards from "../components/dashboard/StatsCards";
import SalesChart from "../components/dashboard/SalesChart";
import InvoiceStatusChart from "../components/dashboard/InvoiceStatusChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import QuickActions from "../components/dashboard/QuickActions";

import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <StatsCards />

      <div className="chart-grid">
        <SalesChart />

        <InvoiceStatusChart />
      </div>

      <RecentInvoices />

      <div className="dashboard-bottom">
        <RecentCustomers />

        <QuickActions />
      </div>
    </>
  );
}

export default Dashboard;
