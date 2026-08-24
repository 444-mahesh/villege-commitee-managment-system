import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/ApiService";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
        setSuccess("");
    };


    const handleSignup = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ==============================
        // VALIDATION
        // ==============================

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.address.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            setError("Please fill all fields.");

            return;
        }


        if (formData.password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError("Passwords do not match.");

            return;
        }


        try {

            setLoading(true);


            const signupData = {

                name: formData.name.trim(),

                email: formData.email
                    .trim()
                    .toLowerCase(),

                phone: formData.phone.trim(),

                address: formData.address.trim(),

                password: formData.password

            };


            console.log(
                "================================"
            );

            console.log(
                "SENDING REGISTRATION REQUEST"
            );

            console.log(
                "Registration data:",
                signupData
            );


            const response =
                await registerUser(signupData);


            console.log(
                "REGISTRATION SUCCESS"
            );

            console.log(
                "Status:",
                response.status
            );

            console.log(
                "Response:",
                response.data
            );

            console.log(
                "================================"
            );


            setSuccess(
                "Registration successful! Redirecting to login..."
            );


            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                confirmPassword: ""
            });


            setTimeout(() => {

                navigate("/");

            }, 1500);


        } catch (error) {

            console.log(
                "================================"
            );

            console.log(
                "REGISTRATION FAILED"
            );

            console.log(
                "Error:",
                error
            );

            console.log(
                "Status:",
                error.response?.status
            );

            console.log(
                "Response data:",
                error.response?.data
            );

            console.log(
                "Response message:",
                error.response?.data?.message
            );

            console.log(
                "================================"
            );


            // ==============================
            // SHOW REAL BACKEND ERROR
            // ==============================

            if (error.response) {

                const data = error.response.data;


                if (typeof data === "string") {

                    setError(data);

                } else if (data?.message) {

                    setError(data.message);

                } else if (data?.error) {

                    setError(data.error);

                } else {

                    setError(
                        "Registration failed. HTTP Status: " +
                        error.response.status
                    );
                }

            } else if (error.request) {

                setError(
                    "Backend server is not responding. Check that Spring Boot is running on port 8080."
                );

            } else {

                setError(
                    "Registration request failed: " +
                    error.message
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh"
            }}
        >

            <div
                className="card shadow p-4"
                style={{
                    width: "100%",
                    maxWidth: "500px"
                }}
            >

                <h2 className="text-center mb-2">
                    Create Account
                </h2>


                <p className="text-center text-muted mb-4">
                    Village Committee Management System
                </p>


                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="alert alert-success">
                        {success}
                    </div>

                )}


                <form onSubmit={handleSignup}>

                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Email ID
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Address
                        </label>

                        <textarea
                            name="address"
                            className="form-control"
                            placeholder="Enter your address"
                            rows="2"
                            value={formData.address}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Sign Up"
                        }

                    </button>

                </form>


                <div className="text-center mt-3">

                    <span>
                        Already have an account?{" "}
                    </span>

                    <Link to="/">
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Signup;