import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Config';

const Updatepassword = () => {
  const [pass, setPass] = useState({
    password: "",
    newPassword: "",
    confPassword: "",
  });

  const navigate = useNavigate();

  const backBtn = () => {
    navigate("/userList");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPass((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass.confPassword !== pass.newPassword) {
      alert("Confirm password and new password should be the same!");
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
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Update Password</h6>
              </div>
            </div>
            <div className="card-body px-4 pb-4">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="form-label text-dark fw-bold">Old Password</label>
                  <input
                    type="password"
                    name="password"
                    value={pass.password}
                    onChange={handleChange}
                    className="form-control border border-dark border-opacity-75 ps-3"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label text-dark fw-bold">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={pass.newPassword}
                    onChange={handleChange}
                    className="form-control border border-dark border-opacity-75 ps-3"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label text-dark fw-bold">Confirm Password</label>
                  <input
                    type="password"
                    name="confPassword"
                    value={pass.confPassword}
                    onChange={handleChange}
                    className="form-control border border-dark border-opacity-75 ps-3"
                    required
                  />
                </div>

                <button type="submit" className="btn bg-gradient-dark text-white mt-3 me-2">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn bg-gradient-dark text-white mt-3"
                  onClick={backBtn}
                >
                  Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatepassword;
