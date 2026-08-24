
import { useState } from "react";
import "./Mahi.css";

const MAHI_API = "http://localhost:8080/api/mahi/ask";

function Mahi() {

    const [isOpen, setIsOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "mahi",
            text: "Hi! I'm MAHI 👋. I can help you with VCMS. Ask me about users, committees, members, complaints, notices, meetings, funds, or VCMS."
        }
    ]);


    // =====================================================
    // ASK MAHI BACKEND
    // =====================================================

    const askMahi = async (question) => {

        try {

            setLoading(true);

            const response = await fetch(MAHI_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            });


            if (!response.ok) {

                throw new Error(
                    "MAHI server returned an error"
                );
            }


            const data =
                await response.json();


            return data.answer ||
                "Sorry, I could not find an answer.";


        } catch (error) {

            console.error(
                "MAHI API ERROR:",
                error
            );


            return "I'm unable to connect to the VCMS server right now. Please make sure Spring Boot is running on port 8080.";

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // SEND MESSAGE
    // =====================================================

    const sendMessage = async () => {

        const question =
            message.trim();


        if (!question || loading) {

            return;

        }


        // Add user's message immediately

        setMessages(
            previousMessages => [

                ...previousMessages,

                {
                    sender: "user",
                    text: question
                }

            ]
        );


        // Clear input

        setMessage("");


        // Get MAHI response

        const answer =
            await askMahi(question);


        // Add MAHI response

        setMessages(
            previousMessages => [

                ...previousMessages,

                {
                    sender: "mahi",
                    text: answer
                }

            ]
        );
    };


    // =====================================================
    // ENTER KEY
    // =====================================================

    const handleKeyDown = (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }
    };


    // =====================================================
    // QUICK QUESTION
    // =====================================================

    const askQuickQuestion = async (
        question
    ) => {

        if (loading) {

            return;

        }


        setMessages(
            previousMessages => [

                ...previousMessages,

                {
                    sender: "user",
                    text: question
                }

            ]
        );


        const answer =
            await askMahi(question);


        setMessages(
            previousMessages => [

                ...previousMessages,

                {
                    sender: "mahi",
                    text: answer
                }

            ]
        );
    };


    // =====================================================
    // OPEN / CLOSE
    // =====================================================

    return (
        <>

            {/* =============================================
                FLOATING MAHI BUTTON
            ============================================= */}

            {!isOpen && (

                <button
                    className="mahi-floating-button"
                    onClick={() => setIsOpen(true)}
                    title="Open MAHI"
                >

                    <span className="mahi-icon">
                        🤖
                    </span>

                    <span className="mahi-button-text">
                        MAHI
                    </span>

                </button>

            )}


            {/* =============================================
                CHAT WINDOW
            ============================================= */}

            {isOpen && (

                <div className="mahi-chat-window">

                    {/* =====================================
                        HEADER
                    ===================================== */}

                    <div className="mahi-header">

                        <div className="mahi-header-info">

                            <div className="mahi-avatar">
                                🤖
                            </div>

                            <div>

                                <h3>
                                    MAHI
                                </h3>

                                <span>
                                    VCMS Assistant
                                </span>

                            </div>

                        </div>


                        <button
                            className="mahi-close-button"
                            onClick={() =>
                                setIsOpen(false)
                            }
                        >
                            ×
                        </button>

                    </div>


                    {/* =====================================
                        MESSAGES
                    ===================================== */}

                    <div className="mahi-messages">

                        {messages.map(
                            (chatMessage, index) => (

                                <div
                                    key={index}
                                    className={
                                        chatMessage.sender === "user"
                                            ? "mahi-message-row user-row"
                                            : "mahi-message-row"
                                    }
                                >

                                    <div
                                        className={
                                            chatMessage.sender === "user"
                                                ? "mahi-message user-message"
                                                : "mahi-message bot-message"
                                        }
                                    >

                                        {chatMessage.text}

                                    </div>

                                </div>

                            )
                        )}


                        {/* =================================
                            LOADING MESSAGE
                        ================================= */}

                        {loading && (

                            <div className="mahi-message-row">

                                <div className="mahi-message bot-message">

                                    MAHI is checking VCMS... ⏳

                                </div>

                            </div>

                        )}

                    </div>


                    {/* =====================================
                        QUICK QUESTIONS
                    ===================================== */}

                    <div className="mahi-quick-questions">

                        <button
                            onClick={() =>
                                askQuickQuestion(
                                    "How many users are registered?"
                                )
                            }
                        >
                            Users
                        </button>


                        <button
                            onClick={() =>
                                askQuickQuestion(
                                    "Show committees"
                                )
                            }
                        >
                            Committees
                        </button>


                        <button
                            onClick={() =>
                                askQuickQuestion(
                                    "How many complaints are there?"
                                )
                            }
                        >
                            Complaints
                        </button>


                        <button
                            onClick={() =>
                                askQuickQuestion(
                                    "Show notices"
                                )
                            }
                        >
                            Notices
                        </button>


                        <button
                            onClick={() =>
                                askQuickQuestion(
                                    "Show meetings"
                                )
                            }
                        >
                            Meetings
                        </button>


                        <button
                            onClick={() =>
                                askQuickQuestion(
                                    "What is the total fund amount?"
                                )
                            }
                        >
                            Funds
                        </button>

                    </div>


                    {/* =====================================
                        INPUT
                    ===================================== */}

                    <div className="mahi-input-area">

                        <input
                            type="text"
                            value={message}
                            onChange={(event) =>
                                setMessage(
                                    event.target.value
                                )
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Ask MAHI about VCMS..."
                            disabled={loading}
                        />


                        <button
                            onClick={sendMessage}
                            className="mahi-send-button"
                            disabled={loading}
                        >
                            ➤
                        </button>

                    </div>

                </div>

            )}

        </>
    );
}

export default Mahi;

