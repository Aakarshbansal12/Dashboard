import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Config';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";

const Updatepassword = () => {
  const [pass, setPass] = useState({
    password: "",
    newPassword: "",
    confPassword: "",
  });
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();

  const backBtn = () => {
    navigate("/userList");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent spaces in input
    const noSpacesValue = value.replace(/\s/g, "");
    setPass((prevData) => ({
      ...prevData,
      [name]: noSpacesValue,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (pass.confPassword !== pass.newPassword) {
      toast.warning("Confirm password and new password should be the same!");
      return;
    }
    if (pass.password !== token.password) {
      toast.error("old password not correct");
      return;
    }

    try {
      await axiosInstance.post("/updateAdminPass",
        {
          password: pass.password,
          newPassword: pass.newPassword,
          confPassword: pass.confPassword,
        },
      );

      alert("Password updated successfully!");
      navigate("/userList");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Failed to update password. Please check your old password.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                  <h6 className="text-white text-capitalize ps-3">Update Password</h6>
                </div>
              </div>
            <div className="card-body px-4 pb-4">
              <form onSubmit={handleSubmit}>

                {/* Old Password */}
                <div className="form-group mb-3 position-relative">
                  <label className="form-label text-dark fw-bold">Old Password</label>
                  <input
                    type={show.old ? "text" : "password"}
                    name="password"
                    value={pass.password}
                    onChange={handleChange}
                    className="form-control border border-dark border-opacity-75 ps-3 pe-5"
                    required
                  />
                  <span
                    onClick={() => setShow((prev) => ({ ...prev, old: !prev.old }))}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "38px",
                      cursor: "pointer",
                      color: "#555",
                    }}
                  >
                    {show.old ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                {/* New Password */}
                <div className="form-group mb-3 position-relative">
                  <label className="form-label text-dark fw-bold">New Password</label>
                  <input
                    type={show.new ? "text" : "password"}
                    name="newPassword"
                    value={pass.newPassword}
                    onChange={handleChange}
                    className="form-control border border-dark border-opacity-75 ps-3 pe-5"
                    maxLength={12}
                    minLength={6}
                    required
                  />
                  <span
                    onClick={() => setShow((prev) => ({ ...prev, new: !prev.new }))}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "38px",
                      cursor: "pointer",
                      color: "#555",
                    }}
                  >
                    {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="form-group mb-3 position-relative">
                  <label className="form-label text-dark fw-bold">Confirm Password</label>
                  <input
                    type={show.confirm ? "text" : "password"}
                    name="confPassword"
                    value={pass.confPassword}
                    onChange={handleChange}
                    className="form-control border border-dark border-opacity-75 ps-3 pe-5"
                    maxLength={12}
                    minLength={6}
                    required
                  />
                  <span
                    onClick={() => setShow((prev) => ({ ...prev, confirm: !prev.confirm }))}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "38px",
                      cursor: "pointer",
                      color: "#555",
                    }}
                  >
                    {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                <button type="submit" className="btn bg-gradient-dark text-white mt-3 me-2">
                  Update
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Updatepassword;
