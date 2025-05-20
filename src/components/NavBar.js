import { Link } from "react-router-dom";
import  "./css/Nav.css";
import {useAuth} from "./AuthContext";

function NavBar() {
    const {username, setUsername,showOtherPages, setShowOtherPages}= useAuth();

    const logout = () => {
        setUsername("");
        setShowOtherPages("false");
    }

    return (
        <nav className="navPage">
            <ul id='navList'>
                {showOtherPages === "true" &&(
                    <>
                        <li className='navItem'><Link className='navLink' to="/shop">Shop</Link></li>
                        <li className='navItem'><Link className='navLink' to="/cart">Cart</Link></li>
                        <li className='navItem'><Link className='navLink' to="/about">About</Link></li>
                        <li className='navItem'><Link className='navLink' to="/statistics">Statistics</Link></li>
                        {username === "avinoam" && (
                            <li className='navItem'><Link className='navLink' to="/administrator">Administrator
                                Extension</Link></li>
                        )}
                        <li className='navItem'><Link className='navLink' to="/feedbacks">Feedbacks</Link></li>
                        <li className='navItem'>
                            <button onClick={logout}>Exit</button>
                        </li>
                    </>
                )}
                <li className='navItem'><Link className='navLink' to="/login">Login</Link></li>
                <li className='navItem'><Link className='navLink' to="/registration">Registration</Link></li>
            </ul>
        </nav>
    );

}
export default NavBar;
