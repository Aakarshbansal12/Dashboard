import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../Config';
import { BASE_URL } from '../Config';

const ViewProduct = () => {
  const [users, setUsers] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchProduct = async (id) => {
    try {
      const res = await axiosInstance.get(`/getProduct/${id}`);
      setUsers(res.data)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);
  const backBtn = () => {
    navigate('/productList')
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                  <h6 className="text-white text-capitalize ps-3">View Product</h6>
                </div>
              </div>
              <div className="card-body px-4 pb-4">
                <form >

                  <div className="form-group mb-3">
                    <label htmlFor="staticEmail" className="col-form-label fw-bold">Category Name</label>
                    <input
                      type="text"
                      readOnly
                      className="form-control border border-dark border-opacity-75 ps-3"
                      id="staticEmail"
                      value={users?.cat.name}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="staticEmail" className="col-form-label fw-bold">Price</label>
                    <input
                      type="text"
                      readOnly
                      className="form-control border border-dark border-opacity-75 ps-3"
                      id="staticEmail"
                      value={users?.prize}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="staticEmail" className="col-form-label fw-bold">Color</label>
                    <input
                      type="text"
                      readOnly
                      className="form-control border border-dark border-opacity-75 ps-3"
                      id="staticEmail"
                      value={users?.color}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="staticEmail" className="col-form-label fw-bold">Model</label>
                    <input
                      type="text"
                      readOnly
                      className="form-control border border-dark border-opacity-75 ps-3"
                      id="staticEmail"
                      value={users?.model}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="staticEmail" className="col-form-label fw-bold">Date</label>
                    <input
                      type="text"
                      readOnly
                      className="form-control border border-dark border-opacity-75 ps-3"
                      id="staticEmail"
                      value={users?.date}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <img src={`${BASE_URL}/${users?.image}`} alt="" />

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

export default ViewProduct
