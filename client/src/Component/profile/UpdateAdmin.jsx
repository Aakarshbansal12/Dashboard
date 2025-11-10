import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance, BASE_URL } from "../Config";

const UpdateAdmin = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    country_code: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      try {
        const response = await axiosInstance.get(`/getAdmin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);
        const user = response.data;

        setData({
          name: user.name || "",
          email: user.email || "",
          number: user.number?.toString() || "",
          country_code: user.country_code || "",
          image: user.image || "",
        });

        const imageUrl = user.image?.startsWith("http")
          ? user.image
          : `${BASE_URL}${user.image}`;
        setImagePreview(imageUrl);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      e.target.value = "";
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;


    let formattedValue = value
      .replace(/^\s+/g, "")
      .replace(/\s{2,}/g, " ");

    setData((prev) => ({ ...prev, [name]: formattedValue }));
  };


  const handleChange1 = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      if (value.trim() === "") {
        setData((prev) => ({ ...prev, [name]: "" }));
      } else {
        setData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("country_code", data.country_code);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axiosInstance.post(`/updateAdmin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully");
      navigate("/updateAdmin", { state: { updated: true } });
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                  <h6 className="text-white text-capitalize ps-3">Profile</h6>
                </div>
              </div>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <div className="card-body py-4">
                        <div className="tab-content">
                          <div className="tab-pane active" id="account">
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                              {/* Profile Image */}
                              <div style={{ flex: "0 0 auto", position: "relative" }}>
                                <div
                                  style={{
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "20px",
                                    backgroundColor: "#e0e0e0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#555",
                                    fontSize: "1.2rem",
                                    position: "relative",
                                  }}
                                >
                                  {imagePreview ? (
                                    <>
                                      <img
                                        src={imagePreview}
                                        alt="Profile"
                                        style={{
                                          width: "300px",
                                          height: "300px",
                                          objectFit: "cover",
                                          borderRadius: "20px",
                                        }}
                                      />
                                      <label
                                        htmlFor="image"
                                        style={{
                                          position: "absolute",
                                          bottom: "15px",
                                          right: "10px",
                                          cursor: "pointer",
                                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                                          borderRadius: "10%",
                                          padding: "5px",
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faPenNib} size="lg" color="black" />
                                      </label>
                                    </>
                                  ) : (
                                    <span>No Image</span>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/jpeg, image/png"
                                  style={{ display: "none" }}
                                  id="image"
                                  onChange={handleImageChange}
                                />
                              </div>

                              {/* Form Fields */}
                              <div style={{ flex: "1", marginLeft: "16px" }}>
                                <div style={{ marginBottom: "16px" }}>
                                  <label htmlFor="name">Name</label>
                                  <input
                                    type="text"
                                    required
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter Name"
                                    maxLength={30}
                                    minLength={4}
                                  />
                                </div>

                                <div style={{ marginBottom: "16px" }}>
                                  <label htmlFor="number">Phone Number</label>
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <span
                                      style={{
                                        padding: "9.5px 12px",
                                        border: "1px solid #ced4da",
                                        borderRight: "none",
                                        borderRadius: "4px 0 0 4px",
                                        backgroundColor: "#e9ecef",
                                        color: "#495057",
                                        fontSize: "14px",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {data.country_code}
                                    </span>
                                    <input
                                      type="text"
                                      name="number"
                                      id="number"
                                      value={data.number}
                                      onChange={handleChange1}
                                      className="form-control"
                                      placeholder="Enter Phone Number"
                                      maxLength={15}
                                      minLength={8}
                                      pattern="\d{8,15}"
                                      required
                                    />

                                  </div>
                                </div>

                                <div style={{ marginBottom: "16px" }}>
                                  <label htmlFor="email">Email</label>
                                  <input
                                    type="email"
                                    readOnly
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    className="form-control"
                                    style={{ backgroundColor: "#e9ecef" }}
                                  />
                                </div>

                                <div className="d-flex justify-content-end">
                                  <button type="submit" className="btn btn-dark">
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAdmin;
