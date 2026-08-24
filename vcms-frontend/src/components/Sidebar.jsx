import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaUserFriends,
    FaClipboard,
    FaBullhorn,
    FaCalendarAlt,
    FaMoneyBillWave
} from "react-icons/fa";

function Sidebar() {

    // ======================================================
    // GET LOGGED-IN USER
    // ======================================================

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        ) || {};

    const role =
        loggedInUser.role
            ? loggedInUser.role.toUpperCase()
            : "VILLAGER";


    // ======================================================
    // COMMON MENU
    // ======================================================

    const dashboardMenu = {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaHome />
    };

    const complaintMenu = {
        name: "Complaints",
        path: "/complaints",
        icon: <FaClipboard />
    };

    const noticeMenu = {
        name: "Notices",
        path: "/notices",
        icon: <FaBullhorn />
    };


    // ======================================================
    // ADMIN MENU
    // ======================================================

    const adminMenu = [

        dashboardMenu,

        {
            name: "Users",
            path: "/users",
            icon: <FaUsers />
        },

        {
            name: "Committees",
            path: "/committees",
            icon: <FaBuilding />
        },

        {
            name: "Members",
            path: "/members",
            icon: <FaUserFriends />
        },

        complaintMenu,

        noticeMenu,

        {
            name: "Meetings",
            path: "/meetings",
            icon: <FaCalendarAlt />
        },

        {
            name: "Funds",
            path: "/funds",
            icon: <FaMoneyBillWave />
        }

    ];


    // ======================================================
    // COMMITTEE MEMBER MENU
    // ======================================================

    const committeeMenu = [

        dashboardMenu,

        complaintMenu,

        noticeMenu,

        {
            name: "Meetings",
            path: "/meetings",
            icon: <FaCalendarAlt />
        }

    ];


    // ======================================================
    // VILLAGER MENU
    // ======================================================

    const villagerMenu = [

        dashboardMenu,

        complaintMenu,

        noticeMenu

    ];


    // ======================================================
    // SELECT MENU BASED ON ROLE
    // ======================================================

    let menu = villagerMenu;


    if (role === "ADMIN") {

        menu = adminMenu;

    }
    else if (
        role === "COMMITTEE_PRESIDENT" ||
        role === "SECRETARY" ||
        role === "TREASURER" ||
        role === "COMMITTEE_MEMBER"
    ) {

        menu = committeeMenu;

    }


    // ======================================================
    // ROLE DISPLAY NAME
    // ======================================================

    let roleName = "Villager";


    if (role === "ADMIN") {

        roleName = "Admin";

    }
    else if (role === "COMMITTEE_PRESIDENT") {

        roleName = "Committee President";

    }
    else if (role === "SECRETARY") {

        roleName = "Secretary";

    }
    else if (role === "TREASURER") {

        roleName = "Treasurer";

    }
    else if (role === "COMMITTEE_MEMBER") {

        roleName = "Committee Member";

    }


    // ======================================================
    // UI
    // ======================================================

    return (

        <div className="sidebar">

            <h3>
                VCMS
            </h3>

            <p>
                {roleName} Panel
            </p>


            {
                menu.map((item, index) => (

                    <NavLink
                        key={index}
                        to={item.path}
                        className="side-link"
                    >

                        <span>
                            {item.icon}
                        </span>

                        {item.name}

                    </NavLink>

                ))
            }

        </div>

    );

}

export default Sidebar;