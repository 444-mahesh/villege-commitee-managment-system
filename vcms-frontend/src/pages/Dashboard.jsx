import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaUsers,
    FaBuilding,
    FaUserFriends,
    FaClipboardList,
    FaMoneyBillWave,
    FaPlus,
    FaUser,
    FaTasks
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

import {
    getUsers,
    getCommittees,
    getMembers,
    getComplaints,
    getFunds
} from "../services/ApiService";


function Dashboard() {

    // ======================================================
    // LOGGED-IN USER
    // ======================================================

    const storedUser =
        localStorage.getItem("loggedInUser");

    const loggedInUser =
        storedUser
            ? JSON.parse(storedUser)
            : null;


    const role =
        loggedInUser?.role
            ? loggedInUser.role.toUpperCase()
            : "VILLAGER";


    const isAdmin =
        role === "ADMIN";


    const isCommitteeMember =
        role === "COMMITTEE_PRESIDENT" ||
        role === "SECRETARY" ||
        role === "TREASURER" ||
        role === "COMMITTEE_MEMBER";


    // ======================================================
    // STATS
    // ======================================================

    const [stats, setStats] = useState({

        users: 0,
        committees: 0,
        members: 0,
        complaints: 0,

        pendingComplaints: 0,
        resolvedComplaints: 0,

        totalFund: 0,
        income: 0,
        expense: 0

    });


    // ======================================================
    // LOAD DATA
    // ======================================================

    useEffect(() => {

        loadData();

    }, [role]);


    const loadData = async () => {

        try {

            // ==================================================
            // ADMIN DASHBOARD
            // ==================================================

            if (isAdmin) {

                const users =
                    await getUsers();

                const committees =
                    await getCommittees();

                const members =
                    await getMembers();

                const complaints =
                    await getComplaints();

                const funds =
                    await getFunds();


                const complaintList =
                    Array.isArray(complaints.data)
                        ? complaints.data
                        : [];


                const fundList =
                    Array.isArray(funds.data)
                        ? funds.data
                        : [];


                const pending =
                    complaintList.filter(
                        complaint =>
                            complaint.status &&
                            complaint.status.toLowerCase() !== "completed" &&
                            complaint.status.toLowerCase() !== "resolved"
                    ).length;


                const resolved =
                    complaintList.filter(
                        complaint =>
                            complaint.status &&
                            (
                                complaint.status.toLowerCase() === "completed" ||
                                complaint.status.toLowerCase() === "resolved"
                            )
                    ).length;


                let income = 0;

                let expense = 0;


                fundList.forEach(fund => {

                    const amount =
                        Number(fund.amount) || 0;


                    const type =
                        fund.type
                            ? fund.type.toLowerCase()
                            : "";


                    if (
                        type === "income" ||
                        type === "credit" ||
                        type === "received"
                    ) {

                        income += amount;

                    }


                    if (
                        type === "expense" ||
                        type === "debit"
                    ) {

                        expense += amount;

                    }

                });


                setStats({

                    users:
                        Array.isArray(users.data)
                            ? users.data.length
                            : 0,

                    committees:
                        Array.isArray(committees.data)
                            ? committees.data.length
                            : 0,

                    members:
                        Array.isArray(members.data)
                            ? members.data.length
                            : 0,

                    complaints:
                        complaintList.length,

                    pendingComplaints:
                        pending,

                    resolvedComplaints:
                        resolved,

                    totalFund:
                        income - expense,

                    income:
                        income,

                    expense:
                        expense

                });

            }

            // ==================================================
            // COMMITTEE MEMBER / OFFICER
            // ==================================================

            else if (isCommitteeMember) {

                /*
                 * We only need complaints for the committee
                 * dashboard.
                 *
                 * The backend is currently allowing the API,
                 * so we simply display complaint information.
                 */

                const complaints =
                    await getComplaints();


                const complaintList =
                    Array.isArray(complaints.data)
                        ? complaints.data
                        : [];


                const pending =
                    complaintList.filter(
                        complaint =>
                            complaint.status &&
                            complaint.status.toLowerCase() !== "completed" &&
                            complaint.status.toLowerCase() !== "resolved"
                    ).length;


                const resolved =
                    complaintList.filter(
                        complaint =>
                            complaint.status &&
                            (
                                complaint.status.toLowerCase() === "completed" ||
                                complaint.status.toLowerCase() === "resolved"
                            )
                    ).length;


                setStats({

                    complaints:
                        complaintList.length,

                    pendingComplaints:
                        pending,

                    resolvedComplaints:
                        resolved

                });

            }

            // ==================================================
            // NORMAL VILLAGER
            // ==================================================

            else {

                /*
                 * Villager does not need admin statistics.
                 *
                 * We only load complaints so the dashboard
                 * can show the complaint section.
                 */

                const complaints =
                    await getComplaints();


                const complaintList =
                    Array.isArray(complaints.data)
                        ? complaints.data
                        : [];


                const pending =
                    complaintList.filter(
                        complaint =>
                            complaint.status &&
                            complaint.status.toLowerCase() !== "completed" &&
                            complaint.status.toLowerCase() !== "resolved"
                    ).length;


                const resolved =
                    complaintList.filter(
                        complaint =>
                            complaint.status &&
                            (
                                complaint.status.toLowerCase() === "completed" ||
                                complaint.status.toLowerCase() === "resolved"
                            )
                    ).length;


                setStats({

                    complaints:
                        complaintList.length,

                    pendingComplaints:
                        pending,

                    resolvedComplaints:
                        resolved

                });

            }

        }
        catch (error) {

            console.log(
                "Dashboard loading error:",
                error
            );

        }

    };


    // ======================================================
    // CHART DATA
    // ======================================================

    const complaintData = [

        {
            name: "Pending",
            value: stats.pendingComplaints
        },

        {
            name: "Completed",
            value: stats.resolvedComplaints
        }

    ];


    const fundData = [

        {
            name: "Income",
            amount: stats.income
        },

        {
            name: "Expense",
            amount: stats.expense
        },

        {
            name: "Balance",
            amount: stats.totalFund
        }

    ];


    // ======================================================
    // DISPLAY NAME
    // ======================================================

    const displayName =
        loggedInUser?.name ||
        loggedInUser?.email ||
        "User";


    // ======================================================
    // ADMIN DASHBOARD
    // ======================================================

    if (isAdmin) {

        return (

            <div className="d-flex">

                <Sidebar />

                <div className="flex-grow-1">

                    <Navbar />

                    <div className="container-fluid p-4">

                        <h2>
                            Admin Dashboard 🚀
                        </h2>

                        <p>
                            Welcome Admin, manage your village
                            committee system.
                        </p>


                        {/* ============================
                            ADMIN STAT CARDS
                        ============================ */}

                        <div className="row mt-4">

                            <div className="col-md-3 mb-3">

                                <StatCard
                                    title="Users"
                                    count={stats.users}
                                    icon={<FaUsers />}
                                    link="/users"
                                    gradient="linear-gradient(135deg,#667eea,#764ba2)"
                                />

                            </div>


                            <div className="col-md-3 mb-3">

                                <StatCard
                                    title="Committees"
                                    count={stats.committees}
                                    icon={<FaBuilding />}
                                    link="/committees"
                                    gradient="linear-gradient(135deg,#11998e,#38ef7d)"
                                />

                            </div>


                            <div className="col-md-3 mb-3">

                                <StatCard
                                    title="Members"
                                    count={stats.members}
                                    icon={<FaUserFriends />}
                                    link="/members"
                                    gradient="linear-gradient(135deg,#ff9966,#ff5e62)"
                                />

                            </div>


                            <div className="col-md-3 mb-3">

                                <StatCard
                                    title="Complaints"
                                    count={stats.complaints}
                                    icon={<FaClipboardList />}
                                    link="/complaints"
                                    gradient="linear-gradient(135deg,#36d1dc,#5b86e5)"
                                />

                            </div>

                        </div>


                        {/* ============================
                            FUND SUMMARY
                        ============================ */}

                        <div className="row mt-3">

                            <div className="col-md-4 mb-3">

                                <div className="card shadow p-4">

                                    <h6>
                                        Total Income
                                    </h6>

                                    <h3 className="text-success">
                                        ₹ {stats.income.toFixed(2)}
                                    </h3>

                                </div>

                            </div>


                            <div className="col-md-4 mb-3">

                                <div className="card shadow p-4">

                                    <h6>
                                        Total Expense
                                    </h6>

                                    <h3 className="text-danger">
                                        ₹ {stats.expense.toFixed(2)}
                                    </h3>

                                </div>

                            </div>


                            <div className="col-md-4 mb-3">

                                <div className="card shadow p-4">

                                    <h6>
                                        Available Fund
                                    </h6>

                                    <h3>
                                        ₹ {stats.totalFund.toFixed(2)}
                                    </h3>

                                </div>

                            </div>

                        </div>


                        {/* ============================
                            CHARTS
                        ============================ */}

                        <div className="row mt-3">

                            <div className="col-md-6 mb-3">

                                <ChartCard title="Complaint Overview">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >

                                        <PieChart>

                                            <Pie
                                                data={complaintData}
                                                dataKey="value"
                                                nameKey="name"
                                                outerRadius={90}
                                            >

                                                {
                                                    complaintData.map(
                                                        (entry, index) => (

                                                            <Cell
                                                                key={index}
                                                            />

                                                        )
                                                    )
                                                }

                                            </Pie>

                                            <Tooltip />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </ChartCard>

                            </div>


                            <div className="col-md-6 mb-3">

                                <ChartCard title="Fund Overview">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >

                                        <BarChart data={fundData}>

                                            <CartesianGrid />

                                            <XAxis dataKey="name" />

                                            <YAxis />

                                            <Tooltip />

                                            <Bar dataKey="amount" />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </ChartCard>

                            </div>

                        </div>


                        {/* ============================
                            QUICK ACTIONS
                        ============================ */}

                        <div className="card shadow mt-4 p-4">

                            <h4>
                                Quick Actions
                            </h4>


                            <div className="mt-3">

                                <Link
                                    className="btn btn-primary me-3"
                                    to="/users"
                                >

                                    <FaPlus /> Add User

                                </Link>


                                <Link
                                    className="btn btn-success me-3"
                                    to="/members"
                                >

                                    <FaPlus /> Add Member

                                </Link>


                                <Link
                                    className="btn btn-warning"
                                    to="/notices"
                                >

                                    <FaPlus /> Create Notice

                                </Link>

                            </div>

                        </div>


                        {/* ============================
                            COMPLAINT SUMMARY
                        ============================ */}

                        <div className="card shadow mt-4 p-4">

                            <h4>
                                Complaint Summary
                            </h4>


                            <div className="row mt-3">

                                <div className="col-md-6">

                                    <div className="alert alert-warning">

                                        Pending Complaints:

                                        <strong className="ms-2">
                                            {stats.pendingComplaints}
                                        </strong>

                                    </div>

                                </div>


                                <div className="col-md-6">

                                    <div className="alert alert-success">

                                        Completed Complaints:

                                        <strong className="ms-2">
                                            {stats.resolvedComplaints}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ============================
                            RECENT ACTIVITIES
                        ============================ */}

                        <div className="card shadow mt-4 p-4">

                            <h4>
                                Recent Activities
                            </h4>


                            <ul>

                                <li>
                                    Users registered
                                </li>

                                <li>
                                    Committee members updated
                                </li>

                                <li>
                                    Complaints monitored
                                </li>

                                <li>
                                    Funds tracked
                                </li>

                            </ul>

                        </div>

                    </div>

                    <Footer />

                </div>

            </div>

        );

    }


    // ======================================================
    // COMMITTEE MEMBER DASHBOARD
    // ======================================================

    if (isCommitteeMember) {

        return (

            <div className="d-flex">

                <Sidebar />

                <div className="flex-grow-1">

                    <Navbar />

                    <div className="container-fluid p-4">

                        <h2>
                            Committee Dashboard
                        </h2>

                        <p>
                            Welcome, {displayName}.
                        </p>


                        <div className="row mt-4">

                            <div className="col-md-4 mb-3">

                                <StatCard
                                    title="Complaints"
                                    count={stats.complaints}
                                    icon={<FaClipboardList />}
                                    link="/complaints"
                                    gradient="linear-gradient(135deg,#36d1dc,#5b86e5)"
                                />

                            </div>


                            <div className="col-md-4 mb-3">

                                <StatCard
                                    title="Pending"
                                    count={stats.pendingComplaints}
                                    icon={<FaTasks />}
                                    link="/complaints"
                                    gradient="linear-gradient(135deg,#f7971e,#ffd200)"
                                />

                            </div>


                            <div className="col-md-4 mb-3">

                                <StatCard
                                    title="Completed"
                                    count={stats.resolvedComplaints}
                                    icon={<FaClipboardList />}
                                    link="/complaints"
                                    gradient="linear-gradient(135deg,#11998e,#38ef7d)"
                                />

                            </div>

                        </div>


                        <div className="row mt-3">

                            <div className="col-md-6 mb-3">

                                <ChartCard title="Complaint Overview">

                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >

                                        <PieChart>

                                            <Pie
                                                data={complaintData}
                                                dataKey="value"
                                                nameKey="name"
                                                outerRadius={90}
                                            >

                                                {
                                                    complaintData.map(
                                                        (entry, index) => (

                                                            <Cell
                                                                key={index}
                                                            />

                                                        )
                                                    )
                                                }

                                            </Pie>

                                            <Tooltip />

                                        </PieChart>

                                    </ResponsiveContainer>

                                </ChartCard>

                            </div>


                            <div className="col-md-6 mb-3">

                                <div className="card shadow p-4">

                                    <h4>
                                        Committee Responsibilities
                                    </h4>

                                    <ul className="mt-3">

                                        <li>
                                            View assigned complaints
                                        </li>

                                        <li>
                                            Update complaint status
                                        </li>

                                        <li>
                                            Monitor pending complaints
                                        </li>

                                        <li>
                                            Complete assigned tasks
                                        </li>

                                    </ul>

                                    <Link
                                        to="/complaints"
                                        className="btn btn-primary mt-2"
                                    >
                                        Open Complaints
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                    <Footer />

                </div>

            </div>

        );

    }


    // ======================================================
    // VILLAGER DASHBOARD
    // ======================================================

    return (

        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container-fluid p-4">

                    <h2>
                        Villager Dashboard
                    </h2>

                    <p>
                        Welcome, {displayName}.
                    </p>


                    {/* ============================
                        VILLAGER CARDS
                    ============================ */}

                    <div className="row mt-4">

                        <div className="col-md-4 mb-3">

                            <StatCard
                                title="My Complaints"
                                count={stats.complaints}
                                icon={<FaClipboardList />}
                                link="/complaints"
                                gradient="linear-gradient(135deg,#36d1dc,#5b86e5)"
                            />

                        </div>


                        <div className="col-md-4 mb-3">

                            <StatCard
                                title="Pending"
                                count={stats.pendingComplaints}
                                icon={<FaTasks />}
                                link="/complaints"
                                gradient="linear-gradient(135deg,#f7971e,#ffd200)"
                            />

                        </div>


                        <div className="col-md-4 mb-3">

                            <StatCard
                                title="Completed"
                                count={stats.resolvedComplaints}
                                icon={<FaClipboardList />}
                                link="/complaints"
                                gradient="linear-gradient(135deg,#11998e,#38ef7d)"
                            />

                        </div>

                    </div>


                    {/* ============================
                        VILLAGER ACTIONS
                    ============================ */}

                    <div className="card shadow mt-4 p-4">

                        <h4>
                            My Services
                        </h4>


                        <p className="text-muted">
                            Use the options below to interact
                            with your village committee.
                        </p>


                        <div className="mt-3">

                            <Link
                                to="/complaints"
                                className="btn btn-primary me-3"
                            >

                                <FaClipboardList />

                                <span className="ms-2">
                                    My Complaints
                                </span>

                            </Link>


                            <Link
                                to="/notices"
                                className="btn btn-warning"
                            >

                                <FaBuilding />

                                <span className="ms-2">
                                    View Notices
                                </span>

                            </Link>

                        </div>

                    </div>


                    {/* ============================
                        PROFILE
                    ============================ */}

                    <div className="card shadow mt-4 p-4">

                        <h4>
                            My Profile
                        </h4>


                        <div className="mt-3">

                            <p>
                                <strong>Name:</strong>{" "}
                                {loggedInUser?.name || "Not available"}
                            </p>


                            <p>
                                <strong>Email:</strong>{" "}
                                {loggedInUser?.email || "Not available"}
                            </p>


                            <p>
                                <strong>Role:</strong>{" "}
                                {role}
                            </p>


                            <p>
                                <strong>Phone:</strong>{" "}
                                {loggedInUser?.phone || "Not available"}
                            </p>


                            <p>
                                <strong>Address:</strong>{" "}
                                {loggedInUser?.address || "Not available"}
                            </p>

                        </div>

                    </div>

                </div>

                <Footer />

            </div>

        </div>

    );

}


export default Dashboard;