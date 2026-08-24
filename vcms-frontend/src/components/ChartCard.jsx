function ChartCard({ title, children }) {

    return (

        <div className="card shadow p-3">

            <h5 className="mb-3">
                {title}
            </h5>

            {children}

        </div>

    );
}


export default ChartCard;