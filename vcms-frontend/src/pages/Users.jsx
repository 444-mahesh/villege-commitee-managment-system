import { useEffect, useState } from "react";

import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getCommittees
} from "../services/ApiService";

function Users() {

    const emptyUser = {
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "VILLAGER",
        committeeId: ""
    };

    const [users, setUsers] = useState([]);

    const [committees, setCommittees] = useState([]);

    const [user, setUser] = useState(emptyUser);

    const [editMode, setEditMode] = useState(false);

    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD USERS AND COMMITTEES
    // ==========================================

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const usersResponse = await getUsers();

            const committeesResponse = await getCommittees();

            setUsers(usersResponse.data);

            setCommittees(committeesResponse.data);

        } catch (error) {

            console.log("Error loading users:", error);

            setError(
                "Unable to load users or committees."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser((previousUser) => ({
            ...previousUser,
            [name]: value
        }));

    };


    // ==========================================
    // SAVE USER
    // ==========================================

    const saveUser = async () => {

        try {

            setError("");

            if (!user.name.trim()) {

                setError("Name is required.");
                return;

            }

            if (!user.email.trim()) {

                setError("Email is required.");
                return;

            }

            if (!user.phone.trim()) {

                setError("Phone number is required.");
                return;

            }

            if (!user.address.trim()) {

                setError("Address is required.");
                return;

            }

            if (!user.role) {

                setError("Please select a role.");
                return;

            }


            /*
             * Only committee members need a committee.
             */

            if (
                user.role === "COMMITTEE_MEMBER" &&
                !user.committeeId
            ) {

                setError(
                    "Please select a committee for the committee member."
                );

                return;
            }


            /*
             * Normal users and Admin do not need
             * a committee.
             */

            const userData = {
                name: user.name.trim(),
                email: user.email.trim(),
                phone: user.phone.trim(),
                address: user.address.trim(),
                role: user.role,
                committeeId:
                    user.role === "COMMITTEE_MEMBER"
                        ? Number(user.committeeId)
                        : null
            };


            if (editMode) {

                await updateUser(
                    editId,
                    userData
                );

                alert(
                    "User updated successfully"
                );

            } else {

                await addUser(userData);

                alert(
                    "User added successfully"
                );

            }


            resetForm();

            await loadData();

        } catch (error) {

            console.log(
                "Error saving user:",
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
                    "User operation failed."
                );
            }

        }

    };


    // ==========================================
    // EDIT USER
    // ==========================================

    const editUser = (selectedUser) => {

        setUser({

            name: selectedUser.name || "",

            email: selectedUser.email || "",

            phone: selectedUser.phone || "",

            address: selectedUser.address || "",

            role:
                selectedUser.role ||
                "VILLAGER",

            committeeId:
                selectedUser.committeeId
                    ? String(selectedUser.committeeId)
                    : ""

        });

        setEditId(selectedUser.id);

        setEditMode(true);

        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // DELETE USER
    // ==========================================

    const removeUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteUser(id);

            alert(
                "User deleted successfully"
            );

            await loadData();

        } catch (error) {

            console.log(
                "Error deleting user:",
                error
            );

            setError(
                "User could not be deleted."
            );

        }

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setUser({
            name: "",
            email: "",
            phone: "",
            address: "",
            role: "VILLAGER",
            committeeId: ""
        });

        setEditMode(false);

        setEditId(null);

        setError("");

    };


    // ==========================================
    // GET COMMITTEE NAME
    // ==========================================

    const getCommitteeName = (committeeId) => {

        if (!committeeId) {
            return "Not assigned";
        }

        const foundCommittee =
            committees.find(
                (committee) =>
                    Number(committee.id) ===
                    Number(committeeId)
            );

        return foundCommittee
            ? foundCommittee.committeeName
            : "Unknown committee";
    };


    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                User Management
            </h2>


            {/* ================================= */}
            {/* USER FORM */}
            {/* ================================= */}

            <div className="card shadow p-4 mb-4">

                <h4 className="mb-3">

                    {editMode
                        ? "Update User"
                        : "Add User"
                    }

                </h4>


                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                />


                <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />


                <input
                    className="form-control mb-2"
                    name="phone"
                    placeholder="Phone"
                    value={user.phone}
                    onChange={handleChange}
                />


                <input
                    className="form-control mb-2"
                    name="address"
                    placeholder="Address"
                    value={user.address}
                    onChange={handleChange}
                />


                {/* ROLE */}

                <label className="form-label mt-2">
                    Role
                </label>

                <select
                    className="form-select mb-3"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                >

                    <option value="VILLAGER">
                        Villager
                    </option>

                    <option value="COMMITTEE_MEMBER">
                        Committee Member
                    </option>

                    <option value="ADMIN">
                        Admin
                    </option>

                </select>


                {/* COMMITTEE */}

                {user.role === "COMMITTEE_MEMBER" && (

                    <>

                        <label className="form-label">
                            Assign Committee
                        </label>

                        <select
                            className="form-select mb-3"
                            name="committeeId"
                            value={user.committeeId}
                            onChange={handleChange}
                        >

                            <option value="">
                                -- Select Committee --
                            </option>

                            {committees.map(
                                (committee) => (

                                    <option
                                        key={committee.id}
                                        value={committee.id}
                                    >

                                        {
                                            committee.committeeName
                                        }

                                    </option>

                                )
                            )}

                        </select>

                    </>

                )}


                <div className="d-flex gap-2">

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={saveUser}
                    >

                        {editMode
                            ? "Update User"
                            : "Add User"
                        }

                    </button>


                    {editMode && (

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >

                            Cancel

                        </button>

                    )}

                </div>

            </div>


            {/* ================================= */}
            {/* USERS TABLE */}
            {/* ================================= */}

            <div className="card shadow">

                <div className="card-body">

                    <h4 className="mb-3">
                        Registered Users
                    </h4>


                    {loading ? (

                        <div className="alert alert-info">
                            Loading users...
                        </div>

                    ) : users.length === 0 ? (

                        <div className="alert alert-info">
                            No users found.
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                        <th>Role</th>

                                        <th>Committee</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map((u) => (

                                        <tr key={u.id}>

                                            <td>
                                                {u.id}
                                            </td>

                                            <td>
                                                {u.name}
                                            </td>

                                            <td>
                                                {u.email}
                                            </td>

                                            <td>
                                                {u.phone}
                                            </td>

                                            <td>

                                                {u.role ===
                                                "COMMITTEE_MEMBER"
                                                    ? "Committee Member"
                                                    : u.role}

                                            </td>

                                            <td>

                                                {u.role ===
                                                "COMMITTEE_MEMBER"
                                                    ? getCommitteeName(
                                                        u.committeeId
                                                    )
                                                    : "—"}

                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        editUser(u)
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        removeUser(
                                                            u.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
}

export default Users;