import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../Config';

const ViewContact = () => {
    const [users, setUsers] = useState(null);
    const { id } = useParams();

    const fetchData = async (id) => {
        try {
            const res = await axiosInstance.get(`/getContact/${id}`);
            console.log(res, '//////////')

            setUsers(res.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        if (id) fetchData(id);
    }, [id]);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                                    <h6 className="text-white text-capitalize ps-3">Contact Details</h6>
                                </div>
                            </div>
                            <div className="card-body px-4 pb-4">
                                <form >
                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Name</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.name}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Email</label>
                                        <input
                                            type="email"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.email}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Number</label>
                                        <input
                                            type="number"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.number}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Message</label>
                                        <input
                                            type="message"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.message}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewContact
