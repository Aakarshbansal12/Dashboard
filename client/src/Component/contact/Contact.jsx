import React from 'react'
import { useState } from 'react';
import { axiosInstance } from '../Config';
import { useEffect } from 'react';
import { Edit, Trash, Eye } from 'react-feather'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/viewContact/${id}`)
    }

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get("/addQuery");
            setUsers(res.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();

    }, [])

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
                        await axiosInstance.post(`/deleteQuery/${id}`);

                        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

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
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                                    <h6 className="text-white text-capitalize ps-3">Contact Us</h6>
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
                                                    Name
                                                </th>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "20%" }}
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "15%" }}
                                                >
                                                    Phone Number
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
                                            {users.map((user, index) => {
                                                return (
                                                    <tr key={user.id}>
                                                        <td className="align-middle text-center">
                                                            <p className="text-xs text-secondary mb-0 ml-3">{index + 1}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs text-secondary mb-0">{user.name}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs text-secondary mb-0">{user.email}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs text-secondary mb-0">{user.number}</p>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <button
                                                                onClick={() => handleView(user.id)}
                                                                className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => { handleDelete(user.id) }}
                                                                className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                            >
                                                                <Trash size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
