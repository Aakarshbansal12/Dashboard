import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { axiosInstance, BASE_URL } from '../Config';
const EditBanner = () => {
    const [category, setCategory] = useState({
        title: "",
        image: null
    });
    const [preview, setPreview] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const showData = async (id) => {
        try {
            const res = await axiosInstance.get(`/getBanner/${id}`)
            setCategory({
                title: res.data.title || "",
                image: res.data.image || null,
            });
            if (res.data.image) {
                setPreview(`${BASE_URL}/${res.data.image}`);
            }
        } catch (error) {
            console.log(error, "error in showing data");
        }
    }

    useEffect(() => {
        if (id) showData(id);
    }, [id]);

    const backBtn = () => {
        navigate("/bannerList");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            e.target.value = "";
            return;
        }

        setCategory((prevData) => ({
            ...prevData,
            image: file,
        }));

        setPreview(URL.createObjectURL(file));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.title.trim() || !category.image) {
            toast.warning("Please fill in all fields before submitting!");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", category.title);
            if (category.image instanceof File) {
                formData.append("image", category.image);
            } else if (typeof category.image === "string") {
                formData.append("oldImage", category.image);
            }

            await axiosInstance.post(`${BASE_URL}/updateBanner/${id}`,
                formData
            );
            toast.success('User Data Updated Successfully ')
            setTimeout(() => {
                navigate("/bannerList");
            }, 500)

        } catch (error) {
            console.log(error, "error in handle Submit");
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-2">
                                    <h6 className="text-white text-capitalize ps-3">Edit Category</h6>
                                </div>
                            </div>
                            <div className="card-body px-4 pb-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-bold">Name</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control border border-dark border-opacity-75 ps-3"
                                            value={category.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="form-label text-dark fw-bold">Upload File</label>
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/png"
                                            className="form-control border border-dark border-opacity-75 ps-3 pe-3"
                                            onChange={handleFileChange}
                                        />
                                        {preview && (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="mt-3 rounded"
                                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                            />
                                        )}
                                    </div>

                                    <button type="submit" className="btn bg-gradient-dark text-white mt-3 me-2">
                                        Save Changes
                                    </button>
                                    <button type="button" className="btn bg-gradient-dark text-white mt-3"
                                        onClick={backBtn}
                                    >
                                        Back
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default EditBanner
