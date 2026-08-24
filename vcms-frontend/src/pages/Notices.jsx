import { useEffect, useState } from "react";

import {
    getNotices,
    addNotice,
    updateNotice,
    deleteNotice
} from "../services/ApiService";

function Notices() {

    const emptyNotice = {
        title: "",
        message: "",
        postedBy: "",
        createdDate: ""
    };

    const [notices, setNotices] = useState([]);

    const [notice, setNotice] = useState(emptyNotice);

    const [editMode, setEditMode] = useState(false);

    const [editId, setEditId] = useState(null);


    useEffect(() => {
        loadNotices();
    }, []);


    const loadNotices = () => {

        getNotices()

            .then(response => {

                setNotices(response.data);

            })

            .catch(error => {

                console.log("Error loading notices:", error);

            });

    };


    const handleChange = (e) => {

        setNotice({
            ...notice,
            [e.target.name]: e.target.value
        });

    };


    const saveNotice = () => {

        if (editMode) {

            updateNotice(editId, notice)

                .then(() => {

                    alert("Notice updated successfully");

                    resetForm();

                    loadNotices();

                })

                .catch(error => {

                    console.log("Update error:", error);

                    alert("Failed to update notice");

                });

        }

        else {

            addNotice(notice)

                .then(() => {

                    alert("Notice added successfully");

                    resetForm();

                    loadNotices();

                })

                .catch(error => {

                    console.log("Add error:", error);

                    alert("Failed to add notice");

                });

        }
    };


    const editNoticeData = (n) => {

        setNotice({

            title: n.title || "",

            message: n.message || "",

            postedBy: n.postedBy || "",

            createdDate: n.createdDate || ""

        });

        setEditId(n.id);

        setEditMode(true);

    };


    const removeNotice = (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this notice?"
        )) {
            return;
        }

        deleteNotice(id)

            .then(() => {

                alert("Notice deleted successfully");

                loadNotices();

            })

            .catch(error => {

                console.log("Delete error:", error);

                alert("Failed to delete notice");

            });

    };


    const resetForm = () => {

        setNotice({
            title: "",
            message: "",
            postedBy: "",
            createdDate: ""
        });

        setEditMode(false);

        setEditId(null);

    };


    return (

        <div className="container mt-4">

            <h2>
                Notice Management
            </h2>


            <div className="card p-3 mb-4">

                <input
                    className="form-control mb-2"
                    name="title"
                    placeholder="Notice Title"
                    value={notice.title}
                    onChange={handleChange}
                />


                <textarea
                    className="form-control mb-2"
                    name="message"
                    placeholder="Notice Message"
                    value={notice.message}
                    onChange={handleChange}
                    rows="3"
                />


                <input
                    className="form-control mb-2"
                    name="postedBy"
                    placeholder="Posted By"
                    value={notice.postedBy}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    className="form-control mb-2"
                    name="createdDate"
                    value={notice.createdDate}
                    onChange={handleChange}
                />


                <button
                    className="btn btn-success"
                    onClick={saveNotice}
                >
                    {editMode
                        ? "Update Notice"
                        : "Add Notice"}
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


            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Title</th>

                        <th>Message</th>

                        <th>Posted By</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {notices.map(n => (

                        <tr key={n.id}>

                            <td>
                                {n.id}
                            </td>

                            <td>
                                {n.title}
                            </td>

                            <td>
                                {n.message}
                            </td>

                            <td>
                                {n.postedBy}
                            </td>

                            <td>
                                {n.createdDate}
                            </td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editNoticeData(n)}
                                >
                                    Edit
                                </button>


                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeNotice(n.id)}
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

export default Notices;