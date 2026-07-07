import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import useSidebar from "../hooks/useSidebar";



import "../styles/DashboardLayout.css";

function DashboardLayout() {
  const { collapsed } = useSidebar();
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        <Topbar />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
