import React from 'react'
import { useState, useEffect } from 'react';
import { axiosInstance } from '../Config';
import { BASE_URL } from '../Config';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Edit, Trash, Eye } from 'react-feather'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductList = () => {
    const [total, setTotal] = useState(0);
    const [product, setProduct] = useState([]);
    const [isToastVisible, setToastVisible] = useState(false);
    const navigate = useNavigate();

    const fetchProductCount = async () => {
        try {
            const res = await axiosInstance.get("/countProduct");
            setTotal(res.data.total);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const fetchProductData = async () => {
        try {
            const res = await axiosInstance.get("/productlist");
            setProduct(res.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleStatusToggle = async (id) => {
        try {
            const res = await axiosInstance.post(`/updateProductStatus/${id}`, {},);

            if (res.data && res.data.status !== undefined) {
                setProduct((prevData) =>
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

    const handleView = (id) => {
        navigate(`/viewProduct/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/editProduct/${id}`);
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
                        await axiosInstance.post(`/deleteProduct/${id}`);

                        setProduct((prevUsers) => prevUsers.filter((user) => user.id !== id));

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
    
    useEffect(() => {
        fetchProductCount();
        fetchProductData();
    }, [])

    return (
        <>
            <div className="container-fluid py-2">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize ps-3">Product List</h6>
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
                                                        No Product Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                product.map((user, index) => (
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
                                                                    onClick={() => { handleEdit(user.id) }}
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

export default ProductList
