import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../Config";
import { useState, useEffect } from "react";
import { axiosInstance } from "../Config";


const Navbar = () => {
  const [users, setUsers] = useState(null);
  const location = useLocation();
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/getAdmin`);
      console.log(res)

      setUsers(res.data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchUser();
    if (location.state?.updated) {
      fetchUser();
    }
  }, [location.state]);

  return (
    <>
      <style>
        {`
          #dropdown-profile::after {
            display: none !important;
          }
        `}
      </style>
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true"
      >
        <div className="container-fluid py-1 px-3">

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm">
                <span className="opacity-5 text-dark">Pages</span>
              </li>
              <li
                className="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </nav>

          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >

            <ul className="navbar-nav ms-auto d-flex align-items-center">

              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as="button"
                  className="nav-link text-dark d-flex align-items-center"
                  id="dropdown-profile"
                  style={{ background: "none", border: "none" }}
                >
                  <img
                    src={`${BASE_URL}/${users?.image}`}
                    alt="Admin Profile"
                    className="rounded-circle me-2"
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                      border: "2px solid #ddd",
                    }}
                  />
                  <span className="fw-semibold">{users?.name}
                    <i
                      className="material-symbols-rounded ms-1"
                      style={{
                        fontSize: "20px",
                        verticalAlign: "middle",
                        color: "#555",
                      }}
                    >
                      expand_more
                    </i>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="shadow-sm border-0">
                  <Dropdown.Item as={Link} to="/updateAdmin">
                    <i
                      className="material-symbols-rounded me-2 text-dark"
                      style={{ fontSize: "18px", verticalAlign: "middle" }}
                    >
                      account_circle
                    </i>
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item as={Link} to="/adminPass">
                    <i className="material-symbols-rounded me-2" style={{ fontSize: "18px", verticalAlign: "middle" }}>
                      lock
                    </i>
                    Update Password
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  {/* 🚪 Added small icon before Log Out */}
                  <Dropdown.Item as={Link} to="/logOut" className="text-danger">
                    <i className="material-symbols-rounded me-2" style={{ fontSize: "18px", verticalAlign: "middle" }}>
                      logout
                    </i>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </ul>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
