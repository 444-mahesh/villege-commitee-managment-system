import { Link } from "react-router-dom";


function StatCard({
    title,
    count,
    icon,
    link,
    gradient
}) {

    return (

        <Link
            to={link}
            style={{
                textDecoration: "none"
            }}
        >

            <div
                className="card shadow p-3 text-white"
                style={{
                    background: gradient,
                    border: "none",
                    minHeight: "140px"
                }}
            >

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h6>
                            {title}
                        </h6>

                        <h2>
                            {count}
                        </h2>

                    </div>


                    <div style={{ fontSize: "40px" }}>
                        {icon}
                    </div>

                </div>

            </div>

        </Link>

    );
}


export default StatCard;