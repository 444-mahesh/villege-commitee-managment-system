
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Committees from "./pages/Committees";
import Members from "./pages/Members";
import Complaints from "./pages/Complaints";
import Notices from "./pages/Notices";
import Meetings from "./pages/Meetings";
import Funds from "./pages/Funds";
import Mahi from "./pages/Mahi";


// ======================================================
// MAHI VISIBILITY
// ======================================================

function MahiAfterLogin() {

    const location = useLocation();

    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem("loggedInUser")
    );


    useEffect(() => {

        const checkLogin = () => {

            setLoggedIn(
                !!localStorage.getItem("loggedInUser")
            );

        };


        checkLogin();

        window.addEventListener(
            "storage",
            checkLogin
        );


        return () => {

            window.removeEventListener(
                "storage",
                checkLogin
            );

        };

    }, [location.pathname]);


    // -----------------------------------------------
    // Do NOT show MAHI on Login
    // Do NOT show MAHI on Signup
    // -----------------------------------------------

    if (
        location.pathname === "/" ||
        location.pathname === "/signup"
    ) {

        return null;

    }


    // -----------------------------------------------
    // Show MAHI only when logged in
    // -----------------------------------------------

    if (!loggedIn) {

        return null;

    }


    return <Mahi />;
}


// ======================================================
// MAIN APP
// ======================================================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/committees"
                    element={<Committees />}
                />

                <Route
                    path="/members"
                    element={<Members />}
                />

                <Route
                    path="/complaints"
                    element={<Complaints />}
                />

                <Route
                    path="/notices"
                    element={<Notices />}
                />

                <Route
                    path="/meetings"
                    element={<Meetings />}
                />

                <Route
                    path="/funds"
                    element={<Funds />}
                />

            </Routes>


            {/* ==========================================
                MAHI ONLY AFTER LOGIN
               ========================================== */}

            <MahiAfterLogin />

        </BrowserRouter>

    );

}


export default App;
