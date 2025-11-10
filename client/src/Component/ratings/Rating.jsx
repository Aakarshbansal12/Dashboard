import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../Config';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'react-feather';
import ResponsivePagination from 'react-responsive-pagination';

const Rating = () => {
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/viewRating/${id}`)
    }

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get("/getAllRating");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);


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
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center text-center mb-0">
                                        <thead className="align-middle">
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: "5%" }}>
                                                    S.No
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: "15%" }}>
                                                    User Name
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: "20%" }}>
                                                    Product Name
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: "15%" }}>
                                                    Rating
                                                </th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ width: "25%" }}>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td className="align-middle text-center">
                                                        <p className="text-xs text-secondary mb-0 ml-3">
                                                            {(currentPage - 1) * itemsPerPage + (index + 1)}
                                                        </p>
                                                    </td>
                                                    <td className="text-sm text-secondary">{user.userss?.name}</td>
                                                    <td className="text-sm text-secondary">{user.products?.name}</td>
                                                    <td className="text-sm text-secondary">{user?.rating}</td>
                                                    <td className="align-middle text-center">
                                                        <button
                                                            onClick={() => handleView(user.id)}
                                                            className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        
                        <div className="d-flex justify-content-center mt-3">
                            <ResponsivePagination
                                current={currentPage}
                                total={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Rating
