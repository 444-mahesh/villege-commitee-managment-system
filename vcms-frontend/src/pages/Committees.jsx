import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getCommittees,
    addCommittee,
    updateCommittee,
    deleteCommittee,
    getMembers,
    getComplaintsByCommittee
} from "../services/ApiService";

function Committees() {

    const emptyCommittee = {
        committeeName: "",
        createdDate: "",
        description: "",
        villageName: ""
    };

    const [committees, setCommittees] = useState([]);
    const [members, setMembers] = useState([]);

    const [committee, setCommittee] = useState(emptyCommittee);

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // Complaint states
    const [selectedCommitteeId, setSelectedCommitteeId] = useState(null);
    const [selectedCommitteeName, setSelectedCommitteeName] = useState("");
    const [committeeComplaints, setCommitteeComplaints] = useState([]);
    const [complaintsLoading, setComplaintsLoading] = useState(false);


    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            const committeeResponse = await getCommittees();
            const memberResponse = await getMembers();

            setCommittees(committeeResponse.data || []);
            setMembers(memberResponse.data || []);

        } catch (error) {

            console.log("Error loading committees or members:", error);

        }

    };


    const handleChange = (e) => {

        setCommittee({
            ...committee,
            [e.target.name]: e.target.value
        });

    };


    const saveCommittee = async () => {

        try {

            if (editMode) {

                await updateCommittee(editId, committee);

                alert("Committee updated successfully");

            } else {

                await addCommittee(committee);

                alert("Committee added successfully");

            }

            resetForm();

            await loadData();

        } catch (error) {

            console.log("Committee operation error:", error);

            alert("Committee operation failed");

        }

    };


    const editCommittee = (c) => {

        setCommittee({
            committeeName: c.committeeName || "",
            createdDate: c.createdDate || "",
            description: c.description || "",
            villageName: c.villageName || ""
        });

        setEditId(c.id);
        setEditMode(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    const removeCommittee = async (id) => {

        try {

            await deleteCommittee(id);

            alert("Committee deleted successfully");

            // If the deleted committee was being viewed,
            // close its complaint section.
            if (Number(selectedCommitteeId) === Number(id)) {
                setSelectedCommitteeId(null);
                setSelectedCommitteeName("");
                setCommitteeComplaints([]);
            }

            await loadData();

        } catch (error) {

            console.log("Delete committee error:", error);

            alert("Committee could not be deleted");

        }

    };


    const resetForm = () => {

        setCommittee({
            committeeName: "",
            createdDate: "",
            description: "",
            villageName: ""
        });

        setEditMode(false);
        setEditId(null);

    };


    const getMemberCount = (committeeId) => {

        return members.filter(
            (m) => Number(m.committeeId) === Number(committeeId)
        ).length;

    };


    // ============================================
    // LOAD COMPLAINTS FOR A PARTICULAR COMMITTEE
    // ============================================

    const viewComplaints = async (committeeId, committeeName) => {

        try {

            setSelectedCommitteeId(committeeId);
            setSelectedCommitteeName(committeeName);

            setComplaintsLoading(true);

            setCommitteeComplaints([]);

            console.log(
                "Loading complaints for committee ID:",
                committeeId
            );

            const response =
                await getComplaintsByCommittee(committeeId);

            console.log(
                "Complaints returned from backend:",
                response.data
            );

            setCommitteeComplaints(response.data || []);

        } catch (error) {

            console.log(
                "Error loading committee complaints:",
                error
            );

            setCommitteeComplaints([]);

            alert(
                "Could not load complaints for this committee."
            );

        } finally {

            setComplaintsLoading(false);

        }

    };


    const closeComplaints = () => {

        setSelectedCommitteeId(null);
        setSelectedCommitteeName("");
        setCommitteeComplaints([]);

    };


    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Committee Management
            </h2>


            {/* =========================================
                COMMITTEE FORM
            ========================================= */}

            <div className="card shadow p-4 mb-4">

                <h4 className="mb-3">

                    {editMode
                        ? "Update Committee"
                        : "Create New Committee"
                    }

                </h4>


                <input
                    className="form-control mb-2"
                    name="committeeName"
                    placeholder="Committee Name"
                    value={committee.committeeName}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    className="form-control mb-2"
                    name="createdDate"
                    value={committee.createdDate}
                    onChange={handleChange}
                />


                <textarea
                    className="form-control mb-2"
                    name="description"
                    placeholder="Description"
                    value={committee.description}
                    onChange={handleChange}
                />


                <input
                    className="form-control mb-3"
                    name="villageName"
                    placeholder="Village Name"
                    value={committee.villageName}
                    onChange={handleChange}
                />


                <button
                    type="button"
                    className="btn btn-success"
                    onClick={saveCommittee}
                >

                    {editMode
                        ? "Update Committee"
                        : "Create Committee"
                    }

                </button>


                {editMode && (

                    <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={resetForm}
                    >
                        Cancel
                    </button>

                )}

            </div>


            {/* =========================================
                COMMITTEE CARDS
            ========================================= */}

            <div className="row">

                {committees.map((c) => {

                    const memberCount = getMemberCount(c.id);

                    return (

                        <div
                            className="col-md-6 col-lg-4 mb-4"
                            key={c.id}
                        >

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h4 className="card-title">
                                        {c.committeeName}
                                    </h4>


                                    <p className="text-muted mb-2">
                                        📍 {c.villageName}
                                    </p>


                                    <p>
                                        {c.description}
                                    </p>


                                    <div className="mb-3">

                                        <span className="badge bg-primary fs-6">

                                            👥 {memberCount} Member
                                            {memberCount !== 1 ? "s" : ""}

                                        </span>

                                    </div>


                                    {/* =================================
                                        ACTIONS
                                    ================================= */}

                                    <div className="d-flex flex-wrap gap-2">


                                        <Link
                                            to={"/members?committeeId=" + c.id}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View Members
                                        </Link>


                                        <Link
                                            to={"/members?add=true&committeeId=" + c.id}
                                            className="btn btn-success btn-sm"
                                        >
                                            + Add Member
                                        </Link>


                                        {/* VIEW COMPLAINTS */}

                                        <button
                                            type="button"
                                            className="btn btn-info btn-sm"
                                            onClick={() =>
                                                viewComplaints(
                                                    c.id,
                                                    c.committeeName
                                                )
                                            }
                                        >
                                            View Complaints
                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                editCommittee(c)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                removeCommittee(c.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>


                                <div className="card-footer text-muted">

                                    Created: {c.createdDate}

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>


            {/* =========================================
                NO COMMITTEES
            ========================================= */}

            {committees.length === 0 && (

                <div className="alert alert-info">

                    No committees created yet.

                </div>

            )}


            {/* =========================================
                COMPLAINTS FOR SELECTED COMMITTEE
            ========================================= */}

            {selectedCommitteeId !== null && (

                <div className="card shadow mt-4 mb-5">

                    <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">

                        <h4 className="mb-0">

                            Complaints Assigned To:{" "}
                            {selectedCommitteeName}

                        </h4>


                        <button
                            type="button"
                            className="btn btn-light btn-sm"
                            onClick={closeComplaints}
                        >
                            Close
                        </button>

                    </div>


                    <div className="card-body">


                        {/* LOADING */}

                        {complaintsLoading && (

                            <div className="text-center p-4">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                </div>

                                <p className="mt-2 mb-0">
                                    Loading complaints...
                                </p>

                            </div>

                        )}


                        {/* NO COMPLAINTS */}

                        {!complaintsLoading &&
                            committeeComplaints.length === 0 && (

                                <div className="alert alert-warning mb-0">

                                    No complaints are currently assigned
                                    to this committee.

                                </div>

                            )}


                        {/* COMPLAINT TABLE */}

                        {!complaintsLoading &&
                            committeeComplaints.length > 0 && (

                                <div className="table-responsive">

                                    <table className="table table-bordered table-hover">

                                        <thead className="table-light">

                                            <tr>

                                                <th>
                                                    ID
                                                </th>

                                                <th>
                                                    Complaint
                                                </th>

                                                <th>
                                                    Description
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                                <th>
                                                    Priority
                                                </th>

                                                <th>
                                                    Member ID
                                                </th>

                                                <th>
                                                    Date
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {committeeComplaints.map(
                                                (complaint) => (

                                                    <tr
                                                        key={complaint.id}
                                                    >

                                                        <td>
                                                            {complaint.id}
                                                        </td>

                                                        <td>
                                                            {complaint.complaintTitle}
                                                        </td>

                                                        <td>
                                                            {complaint.description}
                                                        </td>

                                                        <td>

                                                            <span className="badge bg-secondary">

                                                                {complaint.status ||
                                                                    "Pending"}

                                                            </span>

                                                        </td>

                                                        <td>
                                                            {complaint.priority ||
                                                                "-"}
                                                        </td>

                                                        <td>
                                                            {complaint.memberId ||
                                                                "-"}
                                                        </td>

                                                        <td>
                                                            {complaint.createdDate ||
                                                                "-"}
                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default Committees;