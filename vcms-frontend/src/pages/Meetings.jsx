import { useEffect, useState } from "react";

import {
    getMeetings,
    addMeeting,
    updateMeeting,
    deleteMeeting
} from "../services/ApiService";


function Meetings() {

    const emptyMeeting = {

        title: "",
        meetingDate: "",
        location: "",
        agenda: "",
        organizedBy: ""

    };


    const [meetings, setMeetings] = useState([]);

    const [meeting, setMeeting] = useState(emptyMeeting);

    const [editMode, setEditMode] = useState(false);

    const [editId, setEditId] = useState(null);


    // ================= LOAD MEETINGS =================

    useEffect(() => {

        loadMeetings();

    }, []);


    const loadMeetings = () => {

        getMeetings()

            .then(response => {

                setMeetings(response.data);

            })

            .catch(error => {

                console.log("Error loading meetings:", error);

            });

    };


    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setMeeting({

            ...meeting,

            [e.target.name]: e.target.value

        });

    };


    // ================= SAVE / UPDATE =================

    const saveMeeting = () => {

        if (editMode) {

            updateMeeting(editId, meeting)

                .then(() => {

                    alert("Meeting updated successfully");

                    resetForm();

                    loadMeetings();

                })

                .catch(error => {

                    console.log("Error updating meeting:", error);

                    alert("Failed to update meeting");

                });

        }

        else {

            addMeeting(meeting)

                .then(() => {

                    alert("Meeting added successfully");

                    resetForm();

                    loadMeetings();

                })

                .catch(error => {

                    console.log("Error adding meeting:", error);

                    alert("Failed to add meeting");

                });

        }

    };


    // ================= EDIT =================

    const editMeetingData = (m) => {

        setMeeting({

            title: m.title || "",

            meetingDate: m.meetingDate || "",

            location: m.location || "",

            agenda: m.agenda || "",

            organizedBy: m.organizedBy || ""

        });


        setEditId(m.id);

        setEditMode(true);

    };


    // ================= DELETE =================

    const removeMeeting = (id) => {

        if (!window.confirm("Are you sure you want to delete this meeting?")) {

            return;

        }


        deleteMeeting(id)

            .then(() => {

                alert("Meeting deleted successfully");

                loadMeetings();

            })

            .catch(error => {

                console.log("Error deleting meeting:", error);

                alert("Failed to delete meeting");

            });

    };


    // ================= RESET =================

    const resetForm = () => {

        setMeeting({

            title: "",
            meetingDate: "",
            location: "",
            agenda: "",
            organizedBy: ""

        });

        setEditMode(false);

        setEditId(null);

    };


    // ================= UI =================

    return (

        <div className="container mt-4">

            <h2>
                Meeting Management
            </h2>


            {/* ================= FORM ================= */}

            <div className="card p-3 mb-4">

                <input
                    className="form-control mb-2"
                    name="title"
                    placeholder="Meeting Title"
                    value={meeting.title}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    className="form-control mb-2"
                    name="meetingDate"
                    value={meeting.meetingDate}
                    onChange={handleChange}
                />


                <input
                    className="form-control mb-2"
                    name="location"
                    placeholder="Location"
                    value={meeting.location}
                    onChange={handleChange}
                />


                <textarea
                    className="form-control mb-2"
                    name="agenda"
                    placeholder="Agenda"
                    value={meeting.agenda}
                    onChange={handleChange}
                />


                <input
                    className="form-control mb-2"
                    name="organizedBy"
                    placeholder="Organized By"
                    value={meeting.organizedBy}
                    onChange={handleChange}
                />


                <button
                    className="btn btn-success"
                    onClick={saveMeeting}
                >

                    {editMode
                        ? "Update Meeting"
                        : "Add Meeting"}

                </button>


                {editMode && (

                    <button
                        className="btn btn-secondary mt-2"
                        onClick={resetForm}
                    >

                        Cancel

                    </button>

                )}

            </div>


            {/* ================= TABLE ================= */}

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Title</th>

                        <th>Date</th>

                        <th>Location</th>

                        <th>Organized By</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {meetings.map(m => (

                        <tr key={m.id}>

                            <td>
                                {m.id}
                            </td>

                            <td>
                                {m.title}
                            </td>

                            <td>
                                {m.meetingDate}
                            </td>

                            <td>
                                {m.location}
                            </td>

                            <td>
                                {m.organizedBy}
                            </td>


                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editMeetingData(m)}
                                >

                                    Edit

                                </button>


                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeMeeting(m.id)}
                                >

                                    Delete

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}


export default Meetings;