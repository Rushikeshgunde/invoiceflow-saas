import { useEffect, useState } from "react";

import StatsCards from "../components/dashboard/StatsCards";
import SalesChart from "../components/dashboard/SalesChart";
import InvoiceStatusChart from "../components/dashboard/InvoiceStatusChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import QuickActions from "../components/dashboard/QuickActions";

import { getDashboardStats } from "../services/dashboardService";

import LowStockProducts from "../components/dashboard/LowStockProducts";
import UpcomingDueInvoices from "../components/dashboard/UpcomingDueInvoices";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

import "../styles/Dashboard.css";

function Dashboard() {
  // ==========================================
  // Dashboard State
  // ==========================================

  const [stats, setStats] = useState(null);

  const [recentInvoices, setRecentInvoices] = useState([]);

  const [recentCustomers, setRecentCustomers] = useState([]);

  const [salesChart, setSalesChart] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [upcomingDueInvoices, setUpcomingDueInvoices] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const [invoiceStatus, setInvoiceStatus] = useState({
    paid: 0,
    unpaid: 0,
    partiallyPaid: 0,
  });

  // ==========================================
  // Load Dashboard Data
  // ==========================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardStats();

        setStats(res.stats || null);

        setRecentInvoices(res.recentInvoices || []);

        setRecentCustomers(res.recentCustomers || []);

        setLowStockProducts(res.lowStockProducts || []);

        setUpcomingDueInvoices(res.upcomingDueInvoices || []);

        setRecentActivities(res.recentActivities || []);

        setSalesChart(res.salesChart || []);
        setInvoiceStatus(
          res.invoiceStatus || {
            paid: 0,
            unpaid: 0,
            partiallyPaid: 0,
          },
        );

      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  // ==========================================
  // Render
  // ==========================================

  return (
    <>
      <StatsCards stats={stats} />

      <div className="chart-grid">
        <SalesChart data={salesChart} />

       <InvoiceStatusChart data={invoiceStatus} />
      </div>

      <RecentInvoices invoices={recentInvoices} />
      <LowStockProducts products={lowStockProducts} />
      <UpcomingDueInvoices invoices={upcomingDueInvoices} />
      <ActivityTimeline activities={recentActivities} />

      <div className="dashboard-bottom">
        <RecentCustomers customers={recentCustomers} />

        <QuickActions />
      </div>
    </>
  );
}

export default Dashboard;
