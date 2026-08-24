import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    getMembers,
    addMember,
    updateMember,
    deleteMember,
    getCommittees,
    getUsers
} from "../services/ApiService";

function Members() {

    const emptyMember = {
        userId: "",
        memberName: "",
        email: "",
        phone: "",
        address: "",
        role: "COMMITTEE_MEMBER",
        committeeId: ""
    };

    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [users, setUsers] = useState([]);

    const [member, setMember] = useState(emptyMember);

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [selectedCommitteeId, setSelectedCommitteeId] =
        useState("");

    const [loading, setLoading] = useState(false);


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        loadData();

    }, []);


    // ==========================================
    // READ URL PARAMETERS
    // ==========================================

    useEffect(() => {

        const committeeId =
            searchParams.get("committeeId");

        const addMode =
            searchParams.get("add");


        if (committeeId) {

            setSelectedCommitteeId(committeeId);


            if (addMode === "true") {

                setMember({
                    ...emptyMember,
                    committeeId: committeeId
                });

                setEditMode(false);
                setEditId(null);


                setTimeout(() => {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 100);
            }
        }

    }, [searchParams]);


    // ==========================================
    // LOAD MEMBERS, USERS AND COMMITTEES
    // ==========================================

    const loadData = async () => {

        try {

            setLoading(true);


            const [
                memberResponse,
                committeeResponse,
                userResponse
            ] = await Promise.all([

                getMembers(),
                getCommittees(),
                getUsers()

            ]);


            setMembers(
                memberResponse.data
            );

            setCommittees(
                committeeResponse.data
            );

            setUsers(
                userResponse.data
            );


        } catch (error) {

            console.log(
                "Error loading member data:",
                error
            );


            if (
                error.response &&
                error.response.data
            ) {

                console.log(
                    error.response.data
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // HANDLE USER SELECTION
    // ==========================================

    const handleUserChange = (e) => {

        const userId =
            e.target.value;


        if (userId === "") {

            setMember({
                ...member,
                userId: "",
                memberName: "",
                email: "",
                phone: "",
                address: ""
            });

            return;
        }


        const selectedUser =
            users.find(
                u =>
                    Number(u.id) ===
                    Number(userId)
            );


        if (!selectedUser) {
            return;
        }


        setMember({

            ...member,

            userId: String(
                selectedUser.id
            ),

            memberName:
                selectedUser.name || "",

            email:
                selectedUser.email || "",

            phone:
                selectedUser.phone || "",

            address:
                selectedUser.address || ""

        });
    };


    // ==========================================
    // NORMAL INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        setMember({

            ...member,

            [e.target.name]:
                e.target.value

        });
    };


    // ==========================================
    // SAVE / ASSIGN MEMBER
    // ==========================================

    const saveMember = async () => {

        try {

            if (member.userId === "") {

                alert(
                    "Please select a registered user."
                );

                return;
            }


            if (member.committeeId === "") {

                alert(
                    "Please select a committee."
                );

                return;
            }


            const data = {

                userId:
                    Number(member.userId),

                memberName:
                    member.memberName,

                email:
                    member.email,

                phone:
                    member.phone,

                address:
                    member.address,

                role:
                    member.role,

                committeeId:
                    Number(member.committeeId)

            };


            if (editMode) {

                await updateMember(
                    editId,
                    data
                );

                alert(
                    "Committee assignment updated successfully"
                );

            } else {

                await addMember(data);

                alert(
                    "User assigned to committee successfully"
                );
            }


            resetForm();

            await loadData();


        } catch (error) {

            console.log(
                "Member operation error:",
                error
            );


            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {

                alert(
                    error.response.data.message
                );

            } else {

                alert(
                    "Member operation failed"
                );
            }
        }
    };


    // ==========================================
    // EDIT MEMBER
    // ==========================================

    const editMember = (m) => {

        setMember({

            userId:
                m.userId !== null &&
                m.userId !== undefined
                    ? String(m.userId)
                    : "",

            memberName:
                m.memberName || "",

            email:
                m.email || "",

            phone:
                m.phone || "",

            address:
                m.address || "",

            role:
                m.role ||
                "COMMITTEE_MEMBER",

            committeeId:
                m.committeeId !== null &&
                m.committeeId !== undefined
                    ? String(m.committeeId)
                    : ""

        });


        setEditId(m.id);

        setEditMode(true);


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });
    };


    // ==========================================
    // DELETE MEMBER ASSIGNMENT
    // ==========================================

    const removeMember = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to remove this user from the committee?"
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteMember(id);


            alert(
                "Committee assignment removed successfully"
            );


            await loadData();


        } catch (error) {

            console.log(
                error
            );


            alert(
                "Member could not be deleted"
            );
        }
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setMember({

            ...emptyMember,

            committeeId:
                selectedCommitteeId || ""

        });


        setEditMode(false);

        setEditId(null);
    };


    // ==========================================
    // GET COMMITTEE NAME
    // ==========================================

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


    // ==========================================
    // FILTER MEMBERS
    // ==========================================

    const filteredMembers =
        selectedCommitteeId

            ? members.filter(
                m =>
                    Number(
                        m.committeeId
                    ) ===
                    Number(
                        selectedCommitteeId
                    )
            )

            : members;


    // ==========================================
    // USERS ALREADY ASSIGNED
    // ==========================================

    const assignedUserIds =
        members
            .filter(
                m =>
                    !editMode ||
                    Number(m.id) !==
                    Number(editId)
            )
            .map(
                m =>
                    Number(m.userId)
            );


    // ==========================================
    // AVAILABLE USERS
    // ==========================================

    const availableUsers =
        users.filter(
            u =>
                !assignedUserIds.includes(
                    Number(u.id)
                )
        );


    return (

        <div className="container mt-4">


            <h2 className="mb-4">
                Committee Member Management
            </h2>


            {/* ==================================
                ASSIGNMENT FORM
            ================================== */}

            <div className="card shadow p-4 mb-4">

                <h4 className="mb-3">

                    {editMode
                        ? "Update Committee Assignment"
                        : "Assign User to Committee"
                    }

                </h4>


                <div className="alert alert-info">

                    Select an existing registered VCMS
                    user and assign that user to a
                    committee.

                </div>


                {/* USER */}

                <label className="form-label">

                    Select Registered User

                </label>


                <select
                    className="form-control mb-3"
                    name="userId"
                    value={member.userId}
                    onChange={handleUserChange}
                    disabled={editMode}
                >

                    <option value="">

                        Select User

                    </option>


                    {availableUsers.map(
                        user => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.name}
                                {" - "}
                                {user.email}

                            </option>

                        )
                    )}

                </select>


                {/* NAME */}

                <label className="form-label">

                    User Name

                </label>


                <input
                    className="form-control mb-2"
                    value={
                        member.memberName
                    }
                    readOnly
                />


                {/* EMAIL */}

                <label className="form-label">

                    Email

                </label>


                <input
                    className="form-control mb-2"
                    value={
                        member.email
                    }
                    readOnly
                />


                {/* PHONE */}

                <label className="form-label">

                    Phone

                </label>


                <input
                    className="form-control mb-2"
                    value={
                        member.phone
                    }
                    readOnly
                />


                {/* ADDRESS */}

                <label className="form-label">

                    Address

                </label>


                <input
                    className="form-control mb-3"
                    value={
                        member.address
                    }
                    readOnly
                />


                {/* ROLE */}

                <label className="form-label">

                    Committee Role

                </label>


                <select
                    className="form-control mb-3"
                    name="role"
                    value={
                        member.role
                    }
                    onChange={handleChange}
                >

                    <option value="COMMITTEE_MEMBER">

                        Committee Member

                    </option>

                    <option value="PRESIDENT">

                        President

                    </option>

                    <option value="SECRETARY">

                        Secretary

                    </option>

                    <option value="TREASURER">

                        Treasurer

                    </option>

                </select>


                {/* COMMITTEE */}

                <label className="form-label">

                    Committee

                </label>


                <select
                    className="form-control mb-3"
                    name="committeeId"
                    value={
                        member.committeeId
                    }
                    onChange={handleChange}
                >

                    <option value="">

                        Select Committee

                    </option>


                    {committees.map(
                        c => (

                            <option
                                key={c.id}
                                value={c.id}
                            >

                                {c.committeeName}

                            </option>

                        )
                    )}

                </select>


                {/* SAVE */}

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={saveMember}
                    disabled={loading}
                >

                    {editMode
                        ? "Update Assignment"
                        : "Assign to Committee"
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


            {/* ==================================
                SELECTED COMMITTEE
            ================================== */}

            {selectedCommitteeId && (

                <div className="alert alert-info">

                    Showing members of:

                    <strong className="ms-1">

                        {
                            getCommitteeName(
                                selectedCommitteeId
                            )
                        }

                    </strong>


                    <button
                        type="button"
                        className="btn btn-sm btn-outline-dark ms-3"
                        onClick={() =>
                            setSelectedCommitteeId("")
                        }
                    >

                        Show All

                    </button>

                </div>

            )}


            {/* ==================================
                MEMBERS TABLE
            ================================== */}

            <div className="table-responsive">

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>User ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Role</th>

                            <th>Committee</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredMembers.map(
                            m => (

                                <tr
                                    key={m.id}
                                >

                                    <td>
                                        {m.id}
                                    </td>

                                    <td>
                                        {m.userId || "-"}
                                    </td>

                                    <td>
                                        {m.memberName}
                                    </td>

                                    <td>
                                        {m.email}
                                    </td>

                                    <td>
                                        {m.phone}
                                    </td>

                                    <td>

                                        <span className="badge bg-success">

                                            {m.role}

                                        </span>

                                    </td>

                                    <td>

                                        <span className="badge bg-primary">

                                            {
                                                getCommitteeName(
                                                    m.committeeId
                                                )
                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                editMember(m)
                                            }
                                        >

                                            Edit

                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                removeMember(
                                                    m.id
                                                )
                                            }
                                        >

                                            Remove

                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>


            {filteredMembers.length === 0 && (

                <div className="alert alert-warning">

                    No committee members found.

                </div>

            )}

        </div>
    );
}

export default Members;