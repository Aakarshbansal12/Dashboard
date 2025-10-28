import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { BASE_URL } from '../Config';

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: "",
        company_name: "",
        image: null
    })
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const backBtn = () => {
        navigate('/categoryList');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setCategory((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.name.trim() || !category.image) {
            toast.warning("Please fill in all fields before submitting!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", category.name);
            formData.append("company_name", category.company_name);
            if (category.image instanceof File) {
                formData.append("image", category.image);
            }
            await axios.post(`${BASE_URL}/addCategory`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",

                },
            }
            );
            toast.success('Category Added Successfully ')
            setTimeout(() => {
                navigate("/categoryList");
            }, 500)

        } catch (error) {
            console.log(error, "error in adding category")
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
                                    <h6 className="text-white text-capitalize ps-3">
                                        Add Category
                                    </h6>
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
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        {category.image && !(category.image instanceof File) && (
                                            <img
                                                src={`${BASE_URL}/${category.image}`}
                                                alt="User"
                                                width="120"
                                                className="mb-2 rounded"
                                            />
                                        )}
                                        <br />
                                        <label className="form-label text-dark fw-bold">Upload File</label>
                                        <input
                                            type="file"
                                            className="form-control border border-dark border-opacity-75 ps-3 pe-3"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <button type="submit" className="btn bg-gradient-dark text-white mt-3 me-2">
                                        Add Category
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

export default AddCategory
