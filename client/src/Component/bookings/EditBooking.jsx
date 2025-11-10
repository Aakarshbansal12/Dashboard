import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance, BASE_URL } from '../Config';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const EditBooking = () => {

    const [users, setUsers] = useState({
        booking_date: "",
        booking_time: "",
        booking_code: "",
        price: ""
    })

    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);
    const { id } = useParams();

    const backBtn = () => {
        navigate('/bookingList')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchBooking = async (id) => {
        try {
            const res = await axiosInstance.get(`/getBooking/${id}`);
            setUsers(res.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!String(users.booking_date).trim() ||
            !String(users.booking_code).trim() ||
            !String(users.booking_time).trim() ||
            !String(users.price).trim()) {
            toast.warning("Please fill in all fields before submitting!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("booking_date", users.booking_date);
            formData.append("booking_code", users.booking_code);
            formData.append("booking_time", users.booking_time);
            formData.append("price", users.price);

            await axiosInstance.post(`${BASE_URL}/updateBooking/${id}`, formData);

            toast.success('User Data Updated Successfully ')
            setTimeout(() => {
                navigate("/bookingList");
            }, 1000);

        } catch (error) {
            console.log(error, "error in handle Submit");
        }

    }

    useEffect(() => {
        if (id) fetchBooking(id);
    }, [id]);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                                    <h6 className="text-white text-capitalize ps-3">Edit Bookings</h6>
                                </div>
                            </div>
                            <div className="card-body px-4 pb-4">
                                <form onSubmit={handleSubmit} >
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Booking Date</label>
                                        <input
                                            type="text"
                                            name="booking_date"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            value={users?.booking_date || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Booking Time</label>
                                        <input
                                            type="text"
                                            name="booking_time"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            value={users?.booking_time || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Booking Code</label>
                                        <input
                                            type="text"
                                            name="booking_code"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            value={users?.booking_code || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            value={users?.price || ""}
                                            onChange={handleChange}
                                        />
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

export default EditBooking
