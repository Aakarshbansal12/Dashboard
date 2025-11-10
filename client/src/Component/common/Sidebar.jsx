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
    if(path==="/contactList"){
      return(
        pathname==="/contactList"||
        pathname.startsWith("/viewContact")
      )
    }

    if(path==="/privacy"){
      return(
        pathname==="/privacy"
      )
    }

    if(path==="/aboutUs"){
      return(
        pathname==="/aboutUs"
      )
    }

    if(path==="/termsConditions"){
      return(
        pathname==="/termsConditions"
      )
    }

    if(path==="/rating"){
      return(
        pathname==="/rating"||
        pathname.startsWith("/viewRating")
      )
    }

    if(path==="/bannerList"){
      return(
        pathname==="/bannerList"||
        pathname.startsWith("/viewBanner")||
        pathname.startsWith("/editBanner")
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
              <Link onClick={() => handleActive('/bannerList')}
                className={`nav-link ${isActive('/bannerList') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/bannerList">
                <i className="material-symbols-rounded">campaign</i>
                <span className="nav-link-text ms-1">Banners</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/contactList')}
               className={`nav-link ${isActive('/contactList') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
               to="/contactList">
                <i className="material-symbols-rounded opacity-5">call</i>
                <span className="nav-link-text ms-1">Contact Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/rating')}
                className={`nav-link ${isActive('/rating') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/rating">
                <i className="material-symbols-rounded">star</i>
                <span className="nav-link-text ms-1">Rating</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/privacy')}
                className={`nav-link ${isActive('/privacy') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/privacy">
                <i className="material-symbols-rounded opacity-5">lock</i>
                <span className="nav-link-text ms-1">Privacy & Policy</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/aboutUs')}
                className={`nav-link ${isActive('/aboutUs') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/aboutUs">
                <i className="material-symbols-rounded opacity-5">info</i>
                <span className="nav-link-text ms-1">About Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => handleActive('/termsConditions')}
                className={`nav-link ${isActive('/termsConditions') ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to="/termsConditions">
                <i className="material-symbols-rounded opacity-5">gavel</i>
                <span className="nav-link-text ms-1">Terms And Conditions</span>
              </Link>
            </li>
            {/* <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">Account pages</h6>
            </li> */}
            {/* <Dropdown as="li" className="nav-item">
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
            </Dropdown> */}

            
          </ul>
        </div>
        
      </aside>
    </>
  )
}

export default Sidebar
