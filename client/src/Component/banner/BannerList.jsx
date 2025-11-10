import React, { useEffect, useState } from 'react'
import { axiosInstance, BASE_URL } from '../Config';
import { Eye, Trash,Edit } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BannerList = () => {
    const [total, setTotal] = useState(0);
    const [banner, setBanner] = useState([]);
    const navigate = useNavigate();

    const fetchBannerData = async () => {
        try {
            const res = await axiosInstance.get("/getAllBanner");
            setBanner(res.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const fetchBannerCount = async () => {
        try {
            const res = await axiosInstance.get("/countBanner");
            setTotal(res.data);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    useEffect(() => {
        fetchBannerCount();
        fetchBannerData();
    }, [])

    const handleView = (id) => {
        navigate(`/viewBanner/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/editBanner/${id}`);
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
                        await axiosInstance.post(`/deleteBanner/${id}`);

                        setBanner((prevUsers) => prevUsers.filter((user) => user.id !== id));

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
                                    <h6 className="text-white text-capitalize ps-3">Banner List</h6>
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
                                                    style={{ width: "25%" }}
                                                >
                                                    Title
                                                </th>

                                                <th
                                                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                                    style={{ width: "20%" }}
                                                >
                                                    Image
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
                                                        No Banner  Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                banner.map((user, index) => (
                                                    <tr key={user.id} className="align-middle text-center">
                                                        <td className="text-sm text-secondary">{index + 1}</td>
                                                        <td className="text-sm">{user?.title}</td>
                                                        <td>
                                                            <img
                                                                src={`${BASE_URL}/${user?.image}`}
                                                                className="avatar avatar-sm rounded-circle mx-auto d-block"
                                                                alt={user.name}
                                                            />
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
                                                                    data-tooltip-content="Delete Category"
                                                                    onClick={() => handleEdit(user.id)}
                                                                    className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                                    style={{ cursor: "pointer" }}
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
        </>
    )
}

export default BannerList
