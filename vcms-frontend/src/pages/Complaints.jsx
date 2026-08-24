import { useEffect, useState } from "react";

import {
    getComplaints,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    getCommittees,
    getMembers
} from "../services/ApiService";

function Complaints() {

    // =========================================================
    // LOGGED-IN USER
    // =========================================================

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser") || "null"
        );

    const userRole =
        loggedInUser?.role
            ? loggedInUser.role.toUpperCase()
            : "VILLAGER";

    const isAdmin =
        userRole === "ADMIN" ||
        userRole === "PRESIDENT";

    const isCommitteeMember =
        userRole === "COMMITTEE_MEMBER" ||
        userRole === "SECRETARY" ||
        userRole === "TREASURER" ||
        userRole === "MEMBER";

    const isVillager =
        !isAdmin && !isCommitteeMember;


    // =========================================================
    // EMPTY COMPLAINT
    // =========================================================

    const emptyComplaint = {

        complaintTitle: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        memberId: "",
        committeeId: "",
        createdDate: ""

    };


    // =========================================================
    // STATE
    // =========================================================

    const [complaints, setComplaints] = useState([]);

    const [committees, setCommittees] = useState([]);

    const [members, setMembers] = useState([]);

    const [complaint, setComplaint] =
        useState(emptyComplaint);

    const [editMode, setEditMode] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const complaintResponse =
                await getComplaints();

            const committeeResponse =
                await getCommittees();

            const memberResponse =
                await getMembers();


            setComplaints(
                complaintResponse.data || []
            );

            setCommittees(
                committeeResponse.data || []
            );

            setMembers(
                memberResponse.data || []
            );


        } catch (err) {

            console.log(
                "Complaint loading error:",
                err
            );

            setError(
                "Unable to load complaint information."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================================
    // GET USER'S COMMITTEE ASSIGNMENT
    // =========================================================

    const getMyCommitteeMember = () => {

        if (!loggedInUser) {
            return null;
        }

        const userId =
            Number(loggedInUser.id);

        return members.find(
            member =>
                Number(member.userId) === userId
        ) || null;
    };


    const myCommitteeMember =
        getMyCommitteeMember();


    const myCommitteeId =
        myCommitteeMember?.committeeId
            ? Number(myCommitteeMember.committeeId)
            : null;


    // =========================================================
    // GET MY COMMITTEE
    // =========================================================

    const myCommittee =
        myCommitteeId
            ? committees.find(
                committee =>
                    Number(committee.id) ===
                    myCommitteeId
            )
            : null;


    // =========================================================
    // COMPLAINTS VISIBLE TO CURRENT USER
    // =========================================================

    const visibleComplaints =
        isAdmin

            ? complaints

            : isCommitteeMember

                ? complaints.filter(
                    c =>
                        Number(c.committeeId) ===
                        Number(myCommitteeId)
                )

                : complaints;


    // =========================================================
    // AVAILABLE COMMITTEES
    // =========================================================

    const availableCommittees =
        isAdmin
            ? committees
            : committees;


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setComplaint({

            ...complaint,

            [name]: value

        });
    };


    // =========================================================
    // HANDLE COMMITTEE CHANGE
    // =========================================================

    const handleCommitteeChange = (e) => {

        const committeeId =
            e.target.value;


        setComplaint({

            ...complaint,

            committeeId: committeeId,

            memberId: ""

        });
    };


    // =========================================================
    // MEMBERS OF SELECTED COMMITTEE
    // =========================================================

    const filteredMembers =
        members.filter(
            member =>
                Number(member.committeeId) ===
                Number(complaint.committeeId)
        );


    // =========================================================
    // CREATE / UPDATE COMPLAINT
    // =========================================================

    const saveComplaint = async () => {

        try {

            setError("");


            // -------------------------------------------------
            // BASIC VALIDATION
            // -------------------------------------------------

            if (
                !complaint.complaintTitle.trim()
            ) {

                alert(
                    "Please enter complaint title."
                );

                return;
            }


            if (
                !complaint.description.trim()
            ) {

                alert(
                    "Please enter complaint description."
                );

                return;
            }


            if (
                complaint.committeeId === ""
            ) {

                alert(
                    "Please select a committee."
                );

                return;
            }


            // -------------------------------------------------
            // VILLAGER CREATES COMPLAINT
            // -------------------------------------------------

            if (
                !editMode &&
                isVillager
            ) {

                const data = {

                    complaintTitle:
                        complaint.complaintTitle,

                    description:
                        complaint.description,

                    status: "Pending",

                    priority:
                        complaint.priority,

                    memberId:
                        complaint.memberId === ""
                            ? null
                            : Number(
                                complaint.memberId
                            ),

                    committeeId:
                        Number(
                            complaint.committeeId
                        ),

                    createdDate:
                        complaint.createdDate ||
                        new Date()
                            .toISOString()
                            .split("T")[0]

                };


                await addComplaint(data);


                alert(
                    "Complaint submitted successfully."
                );


                resetForm();

                await loadData();

                return;
            }


            // -------------------------------------------------
            // ADMIN CREATE
            // -------------------------------------------------

            if (
                !editMode &&
                isAdmin
            ) {

                const data = {

                    complaintTitle:
                        complaint.complaintTitle,

                    description:
                        complaint.description,

                    status:
                        complaint.status,

                    priority:
                        complaint.priority,

                    memberId:
                        complaint.memberId === ""
                            ? null
                            : Number(
                                complaint.memberId
                            ),

                    committeeId:
                        Number(
                            complaint.committeeId
                        ),

                    createdDate:
                        complaint.createdDate ||
                        new Date()
                            .toISOString()
                            .split("T")[0]

                };


                await addComplaint(data);


                alert(
                    "Complaint added successfully."
                );


                resetForm();

                await loadData();

                return;
            }


            // -------------------------------------------------
            // ADMIN UPDATE
            // -------------------------------------------------

            if (
                editMode &&
                isAdmin
            ) {

                const data = {

                    complaintTitle:
                        complaint.complaintTitle,

                    description:
                        complaint.description,

                    status:
                        complaint.status,

                    priority:
                        complaint.priority,

                    memberId:
                        complaint.memberId === ""
                            ? null
                            : Number(
                                complaint.memberId
                            ),

                    committeeId:
                        Number(
                            complaint.committeeId
                        ),

                    createdDate:
                        complaint.createdDate

                };


                await updateComplaint(
                    editId,
                    data
                );


                alert(
                    "Complaint updated successfully."
                );


                resetForm();

                await loadData();

                return;
            }


            // -------------------------------------------------
            // COMMITTEE MEMBER STATUS UPDATE
            // -------------------------------------------------

            if (
                editMode &&
                isCommitteeMember
            ) {

                const existingComplaint =
                    complaints.find(
                        c =>
                            Number(c.id) ===
                            Number(editId)
                    );


                if (!existingComplaint) {

                    alert(
                        "Complaint not found."
                    );

                    return;
                }


                if (
                    Number(
                        existingComplaint.committeeId
                    ) !==
                    Number(myCommitteeId)
                ) {

                    alert(
                        "You can only update complaints assigned to your committee."
                    );

                    return;
                }


                const data = {

                    complaintTitle:
                        existingComplaint.complaintTitle,

                    description:
                        existingComplaint.description,

                    status:
                        complaint.status,

                    priority:
                        existingComplaint.priority,

                    memberId:
                        existingComplaint.memberId,

                    committeeId:
                        existingComplaint.committeeId,

                    createdDate:
                        existingComplaint.createdDate

                };


                await updateComplaint(
                    editId,
                    data
                );


                alert(
                    "Complaint status updated successfully."
                );


                resetForm();

                await loadData();

            }


        } catch (err) {

            console.log(
                "Complaint operation error:",
                err
            );


            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {

                alert(
                    err.response.data.message
                );

            } else {

                alert(
                    "Complaint operation failed."
                );
            }
        }
    };


    // =========================================================
    // EDIT COMPLAINT
    // =========================================================

    const editComplaint = (c) => {

        // -----------------------------------------------------
        // COMMITTEE MEMBER
        // Can ONLY update status
        // -----------------------------------------------------

        if (isCommitteeMember) {

            if (
                Number(c.committeeId) !==
                Number(myCommitteeId)
            ) {

                alert(
                    "You can only update complaints assigned to your committee."
                );

                return;
            }


            setComplaint({

                complaintTitle:
                    c.complaintTitle || "",

                description:
                    c.description || "",

                status:
                    c.status || "Pending",

                priority:
                    c.priority || "Medium",

                memberId:
                    c.memberId !== null &&
                    c.memberId !== undefined
                        ? String(c.memberId)
                        : "",

                committeeId:
                    c.committeeId !== null &&
                    c.committeeId !== undefined
                        ? String(c.committeeId)
                        : "",

                createdDate:
                    c.createdDate || ""

            });


            setEditId(c.id);

            setEditMode(true);

            return;
        }


        // -----------------------------------------------------
        // ADMIN
        // -----------------------------------------------------

        if (isAdmin) {

            setComplaint({

                complaintTitle:
                    c.complaintTitle || "",

                description:
                    c.description || "",

                status:
                    c.status || "Pending",

                priority:
                    c.priority || "Medium",

                memberId:
                    c.memberId !== null &&
                    c.memberId !== undefined
                        ? String(c.memberId)
                        : "",

                committeeId:
                    c.committeeId !== null &&
                    c.committeeId !== undefined
                        ? String(c.committeeId)
                        : "",

                createdDate:
                    c.createdDate || ""

            });


            setEditId(c.id);

            setEditMode(true);
        }
    };


    // =========================================================
    // DELETE COMPLAINT
    // =========================================================

    const removeComplaint = async (id) => {

        if (!isAdmin) {

            alert(
                "Only administrators can delete complaints."
            );

            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this complaint?"
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteComplaint(id);


            alert(
                "Complaint deleted successfully."
            );


            await loadData();

        } catch (err) {

            console.log(
                "Delete complaint error:",
                err
            );


            alert(
                "Complaint could not be deleted."
            );
        }
    };


    // =========================================================
    // RESET FORM
    // =========================================================

    const resetForm = () => {

        setComplaint({
            ...emptyComplaint
        });

        setEditMode(false);

        setEditId(null);
    };


    // =========================================================
    // COMMITTEE NAME
    // =========================================================

    const getCommitteeName = (
        committeeId
    ) => {

        const committee =
            committees.find(
                c =>
                    Number(c.id) ===
                    Number(committeeId)
            );


        return committee
            ? committee.committeeName
            : "Not Assigned";
    };


    // =========================================================
    // MEMBER NAME
    // =========================================================

    const getMemberName = (
        memberId
    ) => {

        if (
            memberId === null ||
            memberId === undefined
        ) {

            return "Not Assigned";
        }


        const member =
            members.find(
                m =>
                    Number(m.id) ===
                    Number(memberId)
            );


        return member
            ? member.memberName
            : "Not Assigned";
    };


    // =========================================================
    // STATUS BADGE
    // =========================================================

    const getStatusBadge = (
        status
    ) => {

        if (
            status === "Completed"
        ) {

            return (
                <span className="badge bg-success">
                    Completed
                </span>
            );
        }


        if (
            status === "In Progress"
        ) {

            return (
                <span className="badge bg-warning text-dark">
                    In Progress
                </span>
            );
        }


        return (
            <span className="badge bg-danger">
                Pending
            </span>
        );
    };


    // =========================================================
    // PRIORITY BADGE
    // =========================================================

    const getPriorityBadge = (
        priority
    ) => {

        if (
            priority === "High"
        ) {

            return (
                <span className="badge bg-danger">
                    High
                </span>
            );
        }


        if (
            priority === "Medium"
        ) {

            return (
                <span className="badge bg-warning text-dark">
                    Medium
                </span>
            );
        }


        return (
            <span className="badge bg-success">
                Low
            </span>
        );
    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="container mt-4">

            <h2 className="mb-3">
                Complaint Management
            </h2>


            {/* =================================================
                USER ROLE INFORMATION
            ================================================= */}

            <div className="alert alert-info">

                <strong>
                    Logged in as:
                </strong>

                {" "}

                {loggedInUser?.name || "User"}

                {" | "}

                <strong>
                    Role:
                </strong>

                {" "}

                {userRole}


                {isCommitteeMember && (

                    <>
                        {" | "}

                        <strong>
                            Committee:
                        </strong>

                        {" "}

                        {
                            myCommittee
                                ? myCommittee.committeeName
                                : "Not Assigned"
                        }
                    </>

                )}

            </div>


            {/* =================================================
                UNASSIGNED COMMITTEE MEMBER WARNING
            ================================================= */}

            {isCommitteeMember &&
                !myCommitteeId && (

                    <div className="alert alert-warning">

                        You are registered as a committee
                        member, but you have not yet been
                        assigned to a committee by the
                        administrator.

                    </div>

                )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* =================================================
                COMPLAINT FORM
            ================================================= */}

            {(isAdmin || isVillager) && (

                <div className="card shadow p-4 mb-4">

                    <h4 className="mb-3">

                        {editMode
                            ? "Update Complaint"
                            : "Submit New Complaint"
                        }

                    </h4>


                    {/* TITLE */}

                    <label className="form-label">

                        Complaint Title

                    </label>


                    <input

                        type="text"

                        className="form-control mb-3"

                        name="complaintTitle"

                        placeholder="Enter complaint title"

                        value={
                            complaint.complaintTitle
                        }

                        onChange={
                            handleChange
                        }

                    />


                    {/* DESCRIPTION */}

                    <label className="form-label">

                        Description

                    </label>


                    <textarea

                        className="form-control mb-3"

                        rows="4"

                        name="description"

                        placeholder="Describe your complaint"

                        value={
                            complaint.description
                        }

                        onChange={
                            handleChange
                        }

                    />


                    {/* COMMITTEE */}

                    <label className="form-label">

                        Committee

                    </label>


                    <select

                        className="form-control mb-3"

                        name="committeeId"

                        value={
                            complaint.committeeId
                        }

                        onChange={
                            handleCommitteeChange
                        }

                    >

                        <option value="">

                            Select Committee

                        </option>


                        {availableCommittees.map(
                            committee => (

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


                    {/* MEMBER */}

                    <label className="form-label">

                        Committee Member

                    </label>


                    <select

                        className="form-control mb-3"

                        name="memberId"

                        value={
                            complaint.memberId
                        }

                        onChange={
                            handleChange
                        }

                        disabled={
                            complaint.committeeId === ""
                        }

                    >

                        <option value="">

                            {complaint.committeeId === ""
                                ? "Select committee first"
                                : "Select member"
                            }

                        </option>


                        {filteredMembers.map(
                            member => (

                                <option
                                    key={member.id}
                                    value={member.id}
                                >

                                    {
                                        member.memberName
                                    }

                                </option>

                            )
                        )}

                    </select>


                    {/* STATUS */}

                    {isAdmin && (

                        <>

                            <label className="form-label">

                                Status

                            </label>


                            <select

                                className="form-control mb-3"

                                name="status"

                                value={
                                    complaint.status
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                            </select>

                        </>

                    )}


                    {/* PRIORITY */}

                    <label className="form-label">

                        Priority

                    </label>


                    <select

                        className="form-control mb-3"

                        name="priority"

                        value={
                            complaint.priority
                        }

                        onChange={
                            handleChange
                        }

                    >

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                    </select>


                    {/* DATE */}

                    <label className="form-label">

                        Complaint Date

                    </label>


                    <input

                        type="date"

                        className="form-control mb-3"

                        name="createdDate"

                        value={
                            complaint.createdDate
                        }

                        onChange={
                            handleChange
                        }

                    />


                    {/* BUTTON */}

                    <button

                        type="button"

                        className="btn btn-success"

                        onClick={
                            saveComplaint
                        }

                        disabled={loading}

                    >

                        {editMode
                            ? "Update Complaint"
                            : "Submit Complaint"
                        }

                    </button>


                    {editMode && (

                        <button

                            type="button"

                            className="btn btn-secondary mt-2"

                            onClick={
                                resetForm
                            }

                        >

                            Cancel

                        </button>

                    )}

                </div>

            )}


            {/* =================================================
                COMMITTEE MEMBER STATUS UPDATE FORM
            ================================================= */}

            {isCommitteeMember &&
                editMode && (

                    <div className="card shadow p-4 mb-4">

                        <h4>
                            Update Complaint Status
                        </h4>


                        <div className="alert alert-warning">

                            You can update the status of
                            complaints assigned to your
                            committee.

                        </div>


                        <label className="form-label">

                            Status

                        </label>


                        <select

                            className="form-control mb-3"

                            name="status"

                            value={
                                complaint.status
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                        </select>


                        <button

                            type="button"

                            className="btn btn-success"

                            onClick={
                                saveComplaint
                            }

                        >

                            Update Status

                        </button>


                        <button

                            type="button"

                            className="btn btn-secondary mt-2"

                            onClick={
                                resetForm
                            }

                        >

                            Cancel

                        </button>

                    </div>

                )}


            {/* =================================================
                COMPLAINT TABLE
            ================================================= */}

            <div className="table-responsive">

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Title</th>

                            <th>Description</th>

                            <th>Committee</th>

                            <th>Member</th>

                            <th>Status</th>

                            <th>Priority</th>

                            <th>Date</th>

                            {(isAdmin ||
                                isCommitteeMember) && (

                                <th>
                                    Action
                                </th>

                            )}

                        </tr>

                    </thead>


                    <tbody>

                        {visibleComplaints.map(
                            c => (

                                <tr
                                    key={c.id}
                                >

                                    <td>
                                        {c.id}
                                    </td>


                                    <td>
                                        {c.complaintTitle}
                                    </td>


                                    <td>
                                        {c.description}
                                    </td>


                                    <td>

                                        <span className="badge bg-primary">

                                            {
                                                getCommitteeName(
                                                    c.committeeId
                                                )
                                            }

                                        </span>

                                    </td>


                                    <td>

                                        <span className="badge bg-info text-dark">

                                            {
                                                getMemberName(
                                                    c.memberId
                                                )
                                            }

                                        </span>

                                    </td>


                                    <td>

                                        {
                                            getStatusBadge(
                                                c.status
                                            )
                                        }

                                    </td>


                                    <td>

                                        {
                                            getPriorityBadge(
                                                c.priority
                                            )
                                        }

                                    </td>


                                    <td>
                                        {c.createdDate}
                                    </td>


                                    {(isAdmin ||
                                        isCommitteeMember) && (

                                        <td>

                                            {/* ADMIN ACTIONS */}

                                            {isAdmin && (

                                                <>

                                                    <button

                                                        type="button"

                                                        className="btn btn-warning btn-sm me-2"

                                                        onClick={() =>
                                                            editComplaint(c)
                                                        }

                                                    >

                                                        Edit

                                                    </button>


                                                    <button

                                                        type="button"

                                                        className="btn btn-danger btn-sm"

                                                        onClick={() =>
                                                            removeComplaint(
                                                                c.id
                                                            )
                                                        }

                                                    >

                                                        Delete

                                                    </button>

                                                </>

                                            )}


                                            {/* COMMITTEE MEMBER */}

                                            {isCommitteeMember && (

                                                <button

                                                    type="button"

                                                    className="btn btn-primary btn-sm"

                                                    onClick={() =>
                                                        editComplaint(c)
                                                    }

                                                >

                                                    Update Status

                                                </button>

                                            )}

                                        </td>

                                    )}

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                NO COMPLAINTS
            ================================================= */}

            {!loading &&
                visibleComplaints.length === 0 && (

                    <div className="alert alert-warning">

                        {isCommitteeMember
                            ? "No complaints are currently assigned to your committee."
                            : "No complaints found."
                        }

                    </div>

                )}

        </div>
    );
}

export default Complaints;