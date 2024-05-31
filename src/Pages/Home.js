import { Link } from "react-router-dom";
import "./CSS/Home.css";
import { useAuth } from "../utils/AuthContext";

function Home() {

    const { logout } = useAuth();

    return (
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <h1>Welcome to Home!</h1>

                    <ul>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/products">Items</Link>
                        </li>
                        <li>
                            <Link to="/orders">Order</Link>
                        </li>
                    </ul>

                    <button className="btn btn-primary" onClick={logout}>Logout</button>
                </div>
            </div>
            </div>
            )
}

export default Home;