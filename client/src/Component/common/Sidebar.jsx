import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [pathname, setActivePath] = useState(location.pathname);

  const handleActive = (path) => {
    setActivePath(path);
  };
  const isActive = (path) => {
      if (path === "/categoryList") {
      return (
        pathname === "/categoryList" ||
        pathname.startsWith("/viewCategory") ||
        pathname.startsWith("/editCategory")  ||
        pathname.startsWith("/addCategory")
      );
    }
    if (path === "/userList") {
      return (
        pathname === "/userList" ||
        pathname.startsWith("/viewUser") ||
        pathname.startsWith("/editUser") 
      );
    }
    if (path === "/productList"){
      return(
        pathname === "/productList" ||
        pathname.startsWith("/viewProduct") ||
        pathname.startsWith("/editProduct")
      )
    }
    if (path === "/bookingList"){
      return(
        pathname==="/bookingList"||
        pathname.startsWith("/viewBooking") ||
        pathname.startsWith("/editBooking")
      )
    }

    return pathname.startsWith(path);
  };
  return (
    <>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2" id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <a className="navbar-brand px-4 py-3 m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
            <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img" width="26" height="26" alt="main_logo" />
            <span className="ms-1 text-sm text-dark">Creative Tim</span>
          </a>
        </div>
        <hr className="horizontal dark mt-0 mb-2" />
        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                onClick={() => handleActive('/dashboard')}
                className={`nav-link ${isActive('/dashboard') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/dashboard">
                <i className="material-symbols-rounded opacity-5">dashboard</i>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/userList')}
                className={`nav-link ${isActive('/userList') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/userList">
                <i className="material-symbols-rounded opacity-5">table_view</i>
                <span className="nav-link-text ms-1">User List</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/categoryList')}
                className={`nav-link ${isActive('/categoryList') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/categoryList">
                <i className="material-symbols-rounded opacity-5">receipt_long</i>
                <span className="nav-link-text ms-1">Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/productList')}
                className={`nav-link ${isActive('/productList') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/productList">
                <i className="material-symbols-rounded opacity-5">view_in_ar</i>
                <span className="nav-link-text ms-1">Products</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/bookingList')}
               className={`nav-link ${isActive('/bookingList') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
               to="/bookingList">
                <i className="material-symbols-rounded opacity-5">format_textdirection_r_to_l</i>
                <span className="nav-link-text ms-1">Bookings</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="../pages/notifications.html">
                <i className="material-symbols-rounded opacity-5">notifications</i>
                <span className="nav-link-text ms-1">Notifications</span>
              </a>
            </li>
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">Account pages</h6>
            </li>
            <Dropdown as="li" className="nav-item">
              <Dropdown.Toggle
                as="button"
                className="nav-link text-dark"
                id="dropdown-profile"
                style={{ background: 'none', border: 'none' }}
              >
                <i className="material-symbols-rounded opacity-5">person</i>
                <span className="nav-link-text ms-1">Profile</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/adminProfile" onClick={() => handleActive('/adminProfile')}>
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/adminPass" onClick={() => handleActive('/adminPass')}>
                  update Password
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/logOut" onClick={() => handleActive('/logOut')} >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                <i className="material-symbols-rounded opacity-5">login</i>
                <span className="nav-link-text ms-1">Sign In</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/signUp">
                <i className="material-symbols-rounded opacity-5">assignment</i>
                <span className="nav-link-text ms-1">Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0 ">
          <div className="mx-3">
            <a className="btn btn-outline-dark mt-4 w-100" href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard?ref=sidebarfree" type="button">Documentation</a>
            <a className="btn bg-gradient-dark w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Upgrade to pro</a>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
