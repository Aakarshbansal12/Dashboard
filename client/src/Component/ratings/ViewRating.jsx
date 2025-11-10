import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../Config';

const ViewRating = () => {
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const fetchData = async (id) => {
        try {
            const res = await axiosInstance.get(`/getRating/${id}`);
            setUsers(res.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
            if (id) fetchData(id);
        }, [id]);

        const backBtn = () => {
        navigate('/rating')
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                                    <h6 className="text-white text-capitalize ps-3">Ratings</h6>
                                </div>
                            </div>
                            <div className="card-body px-4 pb-4">
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">User Name</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.userss.name}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Product Name</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.products.name}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Review</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.reviews}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="staticEmail" className="col-form-label fw-bold">Rating</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            id="staticEmail"
                                            value={users?.rating}
                                        />
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

export default ViewRating
