import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import AuthProvider from "./context/AuthContext";
import SidebarProvider from "./context/SidebarContext";
import { NotificationProvider } from "./context/NotificationContext";
import { PaymentProvider } from "./context/PaymentContext";
import { SettingProvider } from "./context/SettingContext.jsx";

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingProvider>
        <PaymentProvider>
          <NotificationProvider>
            <SidebarProvider>
              <App />

              <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
            </SidebarProvider>
          </NotificationProvider>
        </PaymentProvider>
        </SettingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);