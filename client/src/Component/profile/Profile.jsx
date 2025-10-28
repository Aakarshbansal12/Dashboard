import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance,BASE_URL } from '../Config';

const Profile = () => {
    const [users, setUsers] = useState(null);
    const navigate=useNavigate();

    const fetchUser = async () => {
        try {
            const res = await axiosInstance.get(`/getAdmin`);

            setUsers(res.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const backBtn = () => {
        navigate("/userList");
    };
    useEffect(() => {
       fetchUser();
    }, []);
    return (
        <>
            <div className="container-fluid py-2">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">
                                        Admin Profile
                                    </h6>
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
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Country_code</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.country_code}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Number</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.number}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Location</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.location}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <img src={`${BASE_URL}/${users?.image}`} alt="" 
                                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }}/>
                                        
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

export default Profile
