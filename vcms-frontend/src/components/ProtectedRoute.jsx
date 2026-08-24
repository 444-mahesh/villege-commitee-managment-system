import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children,
    allowedRoles = []
}) {

    // ======================================================
    // GET LOGGED-IN USER
    // ======================================================

    const storedUser =
        localStorage.getItem("loggedInUser");

    let loggedInUser = null;

    try {

        loggedInUser =
            storedUser
                ? JSON.parse(storedUser)
                : null;

    } catch (error) {

        console.log(
            "Invalid logged-in user data"
        );

        loggedInUser = null;

    }


    // ======================================================
    // NOT LOGGED IN
    // ======================================================

    if (!loggedInUser) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    // ======================================================
    // GET ROLE
    // ======================================================

    const role =
        loggedInUser.role
            ? loggedInUser.role
                .toString()
                .trim()
                .toUpperCase()
            : "VILLAGER";


    // ======================================================
    // CHECK ROLE
    // ======================================================

    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(role)
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }


    // ======================================================
    // ACCESS ALLOWED
    // ======================================================

    return children;

}

export default ProtectedRoute;