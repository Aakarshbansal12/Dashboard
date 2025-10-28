import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { axiosInstance, BASE_URL } from '../Config';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const [users, setUsers] = useState({
    name: "",
    prize: "",
    color: "",
    model: "",
    date: "",
    category_id: "",
    image: ""
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProduct = async (id) => {
    try {
      const res = await axiosInstance.get(`/getProduct/${id}`);
      setUsers(res.data)

      if (res.data.image) {
        setPreview(`${BASE_URL}/${res.data.image}`);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);



  const backBtn = () => {
    navigate("/productList");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUsers((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!String(users.name).trim() ||
      !String(users.prize).trim() ||
      !String(users.color).trim() ||
      !String(users.model).trim() ||
      !String(users.date).trim() ||
      !String(users.category_id).trim()) {
      toast.warning("Please fill in all fields before submitting!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", users.name);
      formData.append("prize", users.prize);
      formData.append("color", users.color);
      formData.append("model", users.model);
      formData.append("date", users.date);
      formData.append("category_id", users.category_id);
      if (users.image instanceof File) {
        formData.append("image", users.image);
      } else if (typeof users.image === "string") {
        formData.append("oldImage", users.image);
      }

      await axiosInstance.post(`${BASE_URL}/updateProduct/${id}`, formData);

      toast.success('User Data Updated Successfully ')
      setTimeout(() => {
        navigate("/productList");
      }, 2000);

    } catch (error) {
      console.log(error, "error in handle Submit");
    }
  }
  return (
    <>
      <div className="container-fluid py-2">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Edit Product</h6>
                </div>
              </div>
              <div className="card-body px-4 pb-4">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-bold">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control border border-dark border-opacity-75 ps-3"
                      value={users?.name || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-bold">Price</label>
                    <input
                      type="text"
                      name="prize"
                      className="form-control border border-dark border-opacity-75 ps-3"
                      value={users?.prize || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-bold">Color</label>
                    <input
                      type="text"
                      name="color"
                      className="form-control border border-dark border-opacity-75 ps-3"
                      value={users?.color || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-bold">Model</label>
                    <input
                      type="text"
                      name="model"
                      className="form-control border border-dark border-opacity-75 ps-3"
                      value={users?.model || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-bold">Date</label>
                    <input
                      type="text"
                      name="date"
                      className="form-control border border-dark border-opacity-75 ps-3"
                      value={users?.date || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-bold">Category Id</label>
                    <input
                      type="text"
                      name="category_id"
                      className="form-control border border-dark border-opacity-75 ps-3"
                      value={users?.category_id || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label text-dark fw-bold">Upload File</label>
                    <input
                      type="file"
                      className="form-control border border-dark border-opacity-75 ps-3 pe-3"
                      onChange={handleFileChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-3 rounded"
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <button type="submit" className="btn bg-gradient-dark text-white mt-3 me-2">
                    Save Changes
                  </button>

                  <button type="button" className="btn bg-gradient-dark text-white mt-3"
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
      <ToastContainer />
    </>
  )
}

export default EditProduct
