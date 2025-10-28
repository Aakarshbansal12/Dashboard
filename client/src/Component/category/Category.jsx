import React from 'react'
import { useState, useEffect } from 'react';
import { Edit, Trash, Eye } from 'react-feather'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { axiosInstance, BASE_URL } from '../Config';

const Category = () => {

    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState([]);
    const [isToastVisible, setToastVisible] = useState(false);
    const navigate = useNavigate();
    const handleUpdate = (id) => {
        navigate(`/editCategory/${id}`);
    };
    const handleView = (id) => {
        navigate(`/viewCategory/${id}`);
    };

    const fetchUserCount = async () => {
        try {
            const res = await axiosInstance.get("/getCategoryCount");
            setTotal(res.data);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };
    const fetchCategoryData = async () => {
        try {
            const res = await axiosInstance.get("/getAllCategory");
            setCategory(res.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleStatusToggle = async (id) => {
        try {
            const res = await axiosInstance.post(`/categoryStatus/${id}`,{},);

            if (res.data && res.data.status !== undefined) {
                setCategory((prevData) =>
                    prevData.map((user) =>
                        user.id === id ? { ...user, status: String(res.data.status) } : user
                    )
                );

                if (!isToastVisible) {
                    setToastVisible(true);
                    toast.success("User Status Updated Successfully", {
                        onClose: () => setToastVisible(false),
                    });
                }
            }
        } catch (error) {
            console.error('Error in handleStatusToggle:', error);
        }
    };

    const handleDelete = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success mx-2",
                cancelButton: "btn btn-danger mx-2",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axiosInstance.delete(`/deleteCategory/${id}`);

                        setCategory((prevUsers) => prevUsers.filter((user) => user.id !== id));

                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "User has been deleted successfully.",
                            icon: "success",
                        });
                    } catch (error) {
                        console.error("Error deleting user:", error);
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: "Failed to delete user.",
                            icon: "error",
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your data is safe :)",
                        icon: "error",
                    });
                }
            });
    };
    const handleAdd = () => {
        navigate('/addCategory')
    }

    useEffect(() => {
        fetchUserCount();
        fetchCategoryData();
    }, []);
    return (
          <>
            <div className="container-fluid py-2">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 px-3 d-flex justify-content-between align-items-center">
                                    <h6 className="text-white text-capitalize mb-0">Category List</h6>
                                    <button
                                        data-tooltip-id="addTip"
                                        data-tooltip-content="Click to add a new category"
                                        className="btn btn-success text-white"
                                        onClick={handleAdd}
                                    >
                                        Add
                                    </button>

                                    <Tooltip id="addTip" place="bottom" />
                                </div>
                            </div>

                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center text-center mb-0">
                                        <thead className="align-middle">
                                            <tr>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "5%" }}
                                                >
                                                    S.No
                                                </th>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "15%" }}
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "20%" }}
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "15%" }}
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "25%" }}
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {total === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-3">
                                                        No Category Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                category.map((user, index) => (
                                                    <tr key={user.id} className="align-middle text-center">
                                                        <td className="text-sm text-secondary">{index + 1}</td>
                                                        <td>
                                                            <img
                                                                src={`${BASE_URL}/${user.image}`}
                                                                className="avatar avatar-sm rounded-circle mx-auto d-block"
                                                                alt={user.name}
                                                            />
                                                        </td>
                                                        <td className="text-sm">{user.name}</td>
                                                        <td className="align-middle text-center text-sm">
                                                            <button
                                                                className={`btn btn-sm ${user.status === '1' ? 'bg-gradient-success' : 'bg-gradient-danger'
                                                                    } text-white`}
                                                                onClick={() => handleStatusToggle(user.id)}
                                                            >
                                                                {user.status === '1' ? 'Active' : 'InActive'}
                                                            </button>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <div className="d-flex justify-content-center gap-3">
                                                                <button
                                                                    data-tooltip-id="addTip"
                                                                    data-tooltip-content="View Category"
                                                                    onClick={() => { handleView(user.id) }}
                                                                    className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                                >
                                                                    <Eye size={18} />
                                                                </button>
                                                                <button
                                                                    data-tooltip-id="addTip"
                                                                    data-tooltip-content="Edit Category"
                                                                    onClick={() => { handleUpdate(user.id) }}
                                                                    className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                                >
                                                                    <Edit size={18} />
                                                                </button>
                                                                <button
                                                                    data-tooltip-id="addTip"
                                                                    data-tooltip-content="Delete Category"
                                                                    onClick={() => handleDelete(user.id)}
                                                                    className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <Trash size={18} />
                                                                </button>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Category
