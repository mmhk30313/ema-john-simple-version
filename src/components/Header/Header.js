// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <div className="nav-link">
                    <Link className="link" to="/shop">Shop</Link>
                    <Link className="link" to="/review">Order Review</Link>
                    <Link className="link" to="/inventory">Manage Inventory here</Link>
                    <button onClick={() => setLoggedInUser({})} className="btn btn-outline-light sign-out">Sign Out</button>
                </div>
                <div className="search">
                    <input type="text" className='form-control' placeholder="type here to search..."/>
                    {/* <FontAwesomeIcon className="font" icon={faShoppingCart}></FontAwesomeIcon>
                    <span className="miniCart">{cart.length}</span> */}
                </div>
            </nav>
            <br/>
        </div>
    );
};

export default Header;