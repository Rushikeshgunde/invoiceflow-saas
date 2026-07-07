import { FaBars, FaMoon } from "react-icons/fa";

import "../../styles/topbar.css";
import useSidebar from "../../hooks/useSidebar";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import GlobalSearch from "./GlobalSearch";



function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { toggleSidebar } = useSidebar();

  return (
    <header className="topbar">
      {/* Left */}

      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        <div className="search-box">
         
          <GlobalSearch  />
          
        </div>
      </div>

      {/* Right */}

      <div className="topbar-right">
        {/* <button className="icon-btn"> */}
          <NotificationDropdown />
           
        {/* </button> */}

        <button className="icon-btn">
          <FaMoon />
        </button>

        <span className="today">{today}</span>

        {/* <div className="topbar-right"> */}
          <ProfileDropdown />
        {/* </div> */}

      </div>
    </header>
  );
}

export default Topbar;
