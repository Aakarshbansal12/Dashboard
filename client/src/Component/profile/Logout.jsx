import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Logout = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger mx-2"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, stay logged in!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
       
        localStorage.removeItem("token");

        swalWithBootstrapButtons.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success"
        }).then(() => {
          navigate("/login",{ replace: true }); 
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "You are still logged in 🙂",
          icon: "error"
        }).then(() => {
          navigate(-1); 
        });
      }
    });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;
