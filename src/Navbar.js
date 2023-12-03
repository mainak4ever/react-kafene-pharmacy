import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "./RouterEndpoints";

const Navbar = (props) => {
  const classes = {
    Topbar: "Topbar_Topbar__2is_u",
    LeftMenu: "Topbar_LeftMenu__3tQ_2",
    LogoWrapper: "Topbar_LogoWrapper__2hwwN",
    BrandName: "Topbar_BrandName__2xXd6",
    MenuItem: "Topbar_MenuItem__3QSLp",
    Active: "Topbar_Active__uCUUs",
  };
  const currentLocation = useLocation().pathname;

  const renderMenuItems = () => {
    return (
      <div className={classes.LeftMenu}>
        <div className={classes.LogoWrapper}>
          <img
            src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
            alt="Logo"
          />
          <p className={classes.BrandName}>Kafene</p>
        </div>
        <nav>
          <Link
            className={[
              classes.MenuItem,
              currentLocation.includes("orders") ? classes.Active : null,
            ].join(" ")}
            to="/"
          >
            Orders
          </Link>
          <Link
            className={[
              classes.MenuItem,
              currentLocation.includes("products") ? classes.Active : null,
            ].join(" ")}
            to={ROUTE_ENDPOINTS.PRODUCT_LIST}
          >
            Products
          </Link>
          <Link
            className={[
              classes.MenuItem,
              currentLocation.includes("users") ? classes.Active : null,
            ].join(" ")}
            to={ROUTE_ENDPOINTS.USER_LIST}
          >
            Users
          </Link>
        </nav>
      </div>
    );
  };

  const renderLogout = () => {
    return props.isLoggedIn ? (
      <Link className={classes.MenuItem} onClick={props.handleLogout}>
        Logout
      </Link>
    ) : null;
  };

  return (
    <div className={classes.Topbar}>
      {renderMenuItems()}
      {renderLogout()}
    </div>
  );
};

export default Navbar;
