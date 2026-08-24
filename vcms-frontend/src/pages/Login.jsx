import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/ApiService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        if (
            email.trim() === "" ||
            password === ""
        ) {

            setError(
                "Please enter email and password."
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await loginUser({

                    email:
                        email.trim().toLowerCase(),

                    password:
                        password

                });


            console.log(
                "Login response:",
                response.data
            );


            // ==================================================
            // CLEAR OLD JWT DATA
            // ==================================================

            localStorage.removeItem(
                "jwtToken"
            );


            // ==================================================
            // STORE LOGGED-IN USER
            // ==================================================

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(
                    response.data
                )
            );


            console.log(
                "Logged-in user:",
                response.data
            );

            console.log(
                "Role:",
                response.data.role
            );


            // ==================================================
            // GO TO DASHBOARD
            // ==================================================

            navigate("/dashboard");


        } catch (error) {

            console.log(
                "Login error:",
                error
            );


            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Unable to connect to the server."
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
                    maxWidth: "420px"
                }}
            >

                <h2 className="text-center mb-3">
                    VCMS Login
                </h2>


                <p className="text-center text-muted mb-4">
                    Village Committee Management System
                </p>


                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email ID
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                <div className="text-center mt-4">

                    <span className="text-muted">
                        Don't have an account?{" "}
                    </span>

                    <Link
                        to="/signup"
                        className="text-decoration-none fw-bold"
                    >
                        Sign Up
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default Login;