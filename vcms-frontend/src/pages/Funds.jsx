import { useEffect, useState } from "react";

import {
    getFunds,
    addFund,
    updateFund,
    deleteFund
} from "../services/ApiService";


function Funds() {

    const emptyFund = {

        source: "",
        amount: "",
        type: "",
        description: "",
        transactionDate: ""

    };


    const [funds, setFunds] = useState([]);

    const [fund, setFund] = useState(emptyFund);

    const [editMode, setEditMode] = useState(false);

    const [editId, setEditId] = useState(null);


    // ================= LOAD FUNDS =================

    useEffect(() => {

        loadFunds();

    }, []);


    const loadFunds = () => {

        getFunds()

            .then(response => {

                setFunds(response.data);

            })

            .catch(error => {

                console.log("Error loading funds:", error);

            });

    };


    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setFund({

            ...fund,

            [e.target.name]: e.target.value

        });

    };


    // ================= SAVE / UPDATE =================

    const saveFund = () => {

        if (editMode) {

            updateFund(editId, fund)

                .then(() => {

                    alert("Fund updated successfully");

                    resetForm();

                    loadFunds();

                })

                .catch(error => {

                    console.log("Error updating fund:", error);

                    alert("Failed to update fund");

                });

        }

        else {

            addFund(fund)

                .then(() => {

                    alert("Fund added successfully");

                    resetForm();

                    loadFunds();

                })

                .catch(error => {

                    console.log("Error adding fund:", error);

                    alert("Failed to add fund");

                });

        }

    };


    // ================= EDIT =================

    const editFundData = (f) => {

        setFund({

            source: f.source || "",

            amount: f.amount ?? "",

            type: f.type || "",

            description: f.description || "",

            transactionDate: f.transactionDate || ""

        });


        setEditId(f.id);

        setEditMode(true);

    };


    // ================= DELETE =================

    const removeFund = (id) => {

        if (!window.confirm("Are you sure you want to delete this fund?")) {

            return;

        }


        deleteFund(id)

            .then(() => {

                alert("Fund deleted successfully");

                loadFunds();

            })

            .catch(error => {

                console.log("Error deleting fund:", error);

                alert("Failed to delete fund");

            });

    };


    // ================= RESET =================

    const resetForm = () => {

        setFund({

            source: "",
            amount: "",
            type: "",
            description: "",
            transactionDate: ""

        });

        setEditMode(false);

        setEditId(null);

    };


    // ================= UI =================

    return (

        <div className="container mt-4">

            <h2>
                Fund Management
            </h2>


            {/* ================= FORM ================= */}

            <div className="card p-3 mb-4">


                <input
                    className="form-control mb-2"
                    name="source"
                    placeholder="Fund Source"
                    value={fund.source}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    className="form-control mb-2"
                    name="amount"
                    placeholder="Amount"
                    value={fund.amount}
                    onChange={handleChange}
                />


                <input
                    className="form-control mb-2"
                    name="type"
                    placeholder="Fund Type (Income/Expense)"
                    value={fund.type}
                    onChange={handleChange}
                />


                <textarea
                    className="form-control mb-2"
                    name="description"
                    placeholder="Description"
                    value={fund.description}
                    onChange={handleChange}
                />


                <input
                    type="date"
                    className="form-control mb-2"
                    name="transactionDate"
                    value={fund.transactionDate}
                    onChange={handleChange}
                />


                <button
                    className="btn btn-success"
                    onClick={saveFund}
                >

                    {editMode
                        ? "Update Fund"
                        : "Add Fund"}

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

                        <th>Source</th>

                        <th>Amount</th>

                        <th>Type</th>

                        <th>Description</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {funds.map(f => (

                        <tr key={f.id}>

                            <td>
                                {f.id}
                            </td>

                            <td>
                                {f.source}
                            </td>

                            <td>
                                {f.amount}
                            </td>

                            <td>
                                {f.type}
                            </td>

                            <td>
                                {f.description}
                            </td>

                            <td>
                                {f.transactionDate}
                            </td>


                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editFundData(f)}
                                >

                                    Edit

                                </button>


                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeFund(f.id)}
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


export default Funds;