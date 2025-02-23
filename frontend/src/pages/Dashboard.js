import { Outlet } from "react-router-dom";
import Navbar from "../layouts/NavBar";

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
