import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Config';
import { BASE_URL } from '../Config';

const ViewBooking = () => {
    const [users, setUsers] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const fetchBooking = async (id) => {
        try {
            const res = await axiosInstance.get(`/getBooking/${id}`);
            setUsers(res.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        if (id) fetchBooking(id);
    }, [id]);

    const backBtn = () => {
        navigate('/bookingList')
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
                                        View Booking
                                    </h6>
                                </div>
                            </div>
                            <div className="card-body px-4 pb-4">
                                <form >
                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">User Name</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.user.name}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Category name</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.prod?.cate?.name}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Product name</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.prod?.name}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Booking Code</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.booking_code}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <img src={`${BASE_URL}/${users?.prod?.image}`} alt="" />

                                    </div>

                                    <button type="button" className="btn bg-gradient-dark text-white mt-3" onClick={backBtn}>
                                        Back
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBooking
