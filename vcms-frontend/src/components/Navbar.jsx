

import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("loggedIn");

        navigate("/");

    };


    return (

        <div className="navbar-custom">

            <h4>
                Village Committee Management System
            </h4>


            <div className="d-flex align-items-center">

                <FaUserCircle size={30} />

                <span className="ms-2 me-3">
                    Admin
                </span>


                <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>

    );
}


export default Navbar;