import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { axiosInstance, BASE_URL } from '../Config';

const Edit = () => {
    const [users, setData] = useState({
        name: "",
        email: "",
        country_code: "",
        number: "",
        location: "",
        image: null
    });
    const [preview, setPreview] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const showData = async (id) => {
        try {
            const res = await axiosInstance.get(`/getUser/${id}`);

            setData({
                name: res.data.name || "",
                email: res.data.email || "",
                country_code: res.data.country_code || "",
                number: res.data.number || "",
                location: res.data.location || "",
                image: res.data.image || null,
            });

            if (res.data.image) {
                setPreview(`${BASE_URL}/${res.data.image}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (id) showData(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => ({
                ...prevData,
                image: file,
            }));
            setPreview(URL.createObjectURL(file));
        }
    }

    const backBtn = () => {
        navigate("/userList");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!users.name.trim() || !users.image || !users.country_code.trim() || !users.number.toString().trim() || !users.location.trim()) {
            toast.warning("Please fill in all fields before submitting!");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("name", users.name);
            formData.append("email", users.email);
            formData.append("country_code", users.country_code);
            formData.append("number", users.number);
            formData.append("location", users.location);
            if (users.image instanceof File) {
                formData.append("image", users.image);
            } else if (typeof users.image === "string") {
                formData.append("oldImage", users.image);
            }

            await axiosInstance.post(
                `/updateUser/${id}`,
                formData
            );
            toast.success('User Data Updated Successfully ')
            setTimeout(() => {
                navigate("/userList");
            }, 500);


        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                                    <h6 className="text-white text-capitalize ps-3">Edit Info</h6>
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
                                            value={users.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Email Address</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            value={users.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Country Code</label>
                                        <input
                                            type="text"
                                            name="country_code"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            placeholder="Enter Country Code"
                                            value={users.country_code}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Number</label>
                                        <input
                                            type="text"
                                            name="number"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            placeholder="Enter Number"
                                            value={users.number}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            placeholder="Enter Location"
                                            value={users.location}
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
                                    <button type="button" className="btn bg-gradient-dark text-white mt-3" onClick={backBtn}>
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
    );
};

export default Edit;
