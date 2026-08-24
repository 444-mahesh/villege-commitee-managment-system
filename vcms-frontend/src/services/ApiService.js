import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

// ======================================================
// JWT TOKEN INTERCEPTOR
// Automatically sends logged-in user's token
// with every protected API request.
// ======================================================

API.interceptors.request.use(
    (config) => {

        const storedUser =
            localStorage.getItem("loggedInUser");

        if (storedUser) {

            try {

                const user =
                    JSON.parse(storedUser);

                if (user && user.token) {

                    config.headers.Authorization =
                        `Bearer ${user.token}`;

                }

            } catch (error) {

                console.log(
                    "Unable to read logged-in user:",
                    error
                );

            }
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

API.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response) {

            console.log(
                "API ERROR:",
                error.response.status,
                error.response.data
            );

            // Do NOT automatically remove the user on 403.
            // We need the logged-in session to remain available.
        }

        return Promise.reject(error);
    }
);


// ======================================================
// USER API
// ======================================================

export const getUsers = () => {

    return API.get("/users");
};

export const addUser = (user) => {

    return API.post("/users", user);
};

export const updateUser = (id, user) => {

    return API.put(
        `/users/${id}`,
        user
    );
};

export const deleteUser = (id) => {

    return API.delete(
        `/users/${id}`
    );
};


// ======================================================
// AUTH API
// ======================================================

export const loginUser = (loginData) => {

    return API.post(
        "/auth/login",
        loginData
    );
};

export const registerUser = (user) => {

    return API.post(
        "/auth/register",
        user
    );
};


// ======================================================
// COMMITTEE API
// ======================================================

export const getCommittees = () => {

    return API.get("/committees");
};

export const addCommittee = (committee) => {

    return API.post(
        "/committees",
        committee
    );
};

export const updateCommittee = (
    id,
    committee
) => {

    return API.put(
        `/committees/${id}`,
        committee
    );
};

export const deleteCommittee = (id) => {

    return API.delete(
        `/committees/${id}`
    );
};


// ======================================================
// MEMBER API
// ======================================================

export const getMembers = () => {

    return API.get("/members");
};

export const getMembersByCommittee = (
    committeeId
) => {

    return API.get(
        `/members/committee/${committeeId}`
    );
};

export const getMemberByUserId = (
    userId
) => {

    return API.get(
        `/members/user/${userId}`
    );
};

export const addMember = (member) => {

    return API.post(
        "/members",
        member
    );
};

export const updateMember = (
    id,
    member
) => {

    return API.put(
        `/members/${id}`,
        member
    );
};

export const deleteMember = (id) => {

    return API.delete(
        `/members/${id}`
    );
};


// ======================================================
// COMPLAINT API
// ======================================================

export const getComplaints = () => {

    return API.get("/complaints");
};

export const getComplaintsByCommittee = (
    committeeId
) => {

    return API.get(
        `/complaints/committee/${committeeId}`
    );
};

export const getComplaintById = (
    id
) => {

    return API.get(
        `/complaints/${id}`
    );
};

export const addComplaint = (
    complaint
) => {

    return API.post(
        "/complaints",
        complaint
    );
};

export const updateComplaint = (
    id,
    complaint
) => {

    return API.put(
        `/complaints/${id}`,
        complaint
    );
};

export const deleteComplaint = (
    id
) => {

    return API.delete(
        `/complaints/${id}`
    );
};


// ======================================================
// NOTICE API
// ======================================================

export const getNotices = () => {

    return API.get("/notices");
};

export const addNotice = (
    notice
) => {

    return API.post(
        "/notices",
        notice
    );
};

export const updateNotice = (
    id,
    notice
) => {

    return API.put(
        `/notices/${id}`,
        notice
    );
};

export const deleteNotice = (
    id
) => {

    return API.delete(
        `/notices/${id}`
    );
};


// ======================================================
// MEETING API
// ======================================================

export const getMeetings = () => {

    return API.get("/meetings");
};

export const addMeeting = (
    meeting
) => {

    return API.post(
        "/meetings",
        meeting
    );
};

export const updateMeeting = (
    id,
    meeting
) => {

    return API.put(
        `/meetings/${id}`,
        meeting
    );
};

export const deleteMeeting = (
    id
) => {

    return API.delete(
        `/meetings/${id}`
    );
};


// ======================================================
// FUND API
// ======================================================

export const getFunds = () => {

    return API.get("/funds");
};

export const addFund = (
    fund
) => {

    return API.post(
        "/funds",
        fund
    );
};

export const updateFund = (
    id,
    fund
) => {

    return API.put(
        `/funds/${id}`,
        fund
    );
};

export const deleteFund = (
    id
) => {

    return API.delete(
        `/funds/${id}`
    );
};


// ======================================================
// DEFAULT EXPORT
// ======================================================

export default API;