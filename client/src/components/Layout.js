import React from "react";
import "../styles/Layoutstyle.css";
import { UserMenu, adminMenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Doctor Menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const SideBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : UserMenu;

  const logOut = () => {
    localStorage.clear();
    message.success("Logout Successful");
    navigate("/login");
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="logo">
              <img
                className="mt-3"
                src="/images/cropped-eyfdm-edited.png"
                alt="logo"
              />
              <h4>
                Medi<span className="mate">Mate</span>
              </h4>
              <hr />
            </div>

            <div className="menu">
              {SideBarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.path || index}
                    className={`menu-item ${isActive ? "active" : ""}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}

              <div className="menu-item" onClick={logOut}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  className="username"
                  count={user?.notification?.length || 0}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link className="username1 text-white" to="/profile">
                  {user?.name}
                </Link>
              </div>
            </div>

            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
