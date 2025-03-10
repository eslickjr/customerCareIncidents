import logo from '../assets/wf-logo-no-text-VJ0tgwuY.svg'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    //const associateId = localStorage.getItem('associateId');

    return (
        <nav id="navContainer">
            <ul id="navbar">
                <Link to="/" id="logoLink">
                        <img src={logo} alt="logo" id="logo" />
                </Link>
                <li id="home" className="navbarElement home">
                    <Link to="/" id="homeLink" className="home">Customer Care Incidents</Link>
                </li>
                <li id="userStats" className="navbarElement userStats">
                    <Link to="/userStats" id="statsLink" className="userStats">Stats</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;