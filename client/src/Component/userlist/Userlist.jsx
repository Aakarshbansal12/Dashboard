import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Edit, Trash, Eye } from 'react-feather'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { axiosInstance, BASE_URL } from "../Config";


const Table = () => {
  const [users, setUsers] = useState([]);
  const [isToastVisible, setToastVisible] = useState(false);

  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/viewUser/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/editUser/${id}`);
  };


  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/getAllUsers");
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
            await axiosInstance.delete(`/deleteUser/${id}`);

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
  const handleStatusToggle = async (id) => {
    try {
      const res = await axiosInstance.post(`/updateStatus/${id}`);

      if (res.data && res.data.status !== undefined) {
        setUsers((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, status: String(res.data.status) } : user
          )
        );
        // toast.success('User Status Updated Successfully ')
        // if (!isToastVisible) {
        //   setToastVisible(true);
          toast.success("User Status Updated Successfully")
        //     {
        //     onClose: () => setToastVisible(false),
        //   }
        // );
        // }
      }
    } catch (error) {
      console.error('Error in handleStatusToggle:', error);
    }
  };

  return (
    <>
      <div className="container-fluid py-2">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">
                    Users
                  </h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0 w-100">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-10 ps-2">
                          S.no
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-25">
                          Name
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-25 ps-2">
                          Email
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20 ps-2">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20 ps-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user,index) => {
                        return (
                          <tr key={user.id}>
                            <td className="align-middle text-center">
                              <p className="text-xs text-secondary mb-0 ml-3">{index+1}</p>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={`${BASE_URL}/${user.image}`}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt={user.name}
                                  />

                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{user.name}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs text-secondary mb-0">{user.email}</p>
                            </td>
                              <td className="align-middle text-center text-sm">
                                <button
                                  className={`btn btn-sm ${user.status === '1' ? 'bg-gradient-success' : 'bg-gradient-danger'
                                    } text-white`}
                                  onClick={() => handleStatusToggle(user.id)}
                                >
                                  {user.status === '1' ? 'Online' : 'Offline'}
                                </button>
                              </td>

                            <td className="align-middle text-center">
                              <div className="d-flex justify-content-center gap-3">
                                <button
                                  onClick={() => { handleUpdate(user.id) }}
                                  className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                  style={{ cursor: "pointer" }}
                                >
                                  <Trash size={18} />
                                </button>
                                <button
                                  onClick={() => { handleView(user.id) }}
                                  className="text-secondary font-weight-bold text-xs bg-transparent border-0"
                                >
                                  <Eye size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
  );
};

export default Table;
