import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header style={{ padding: '10px',  textAlign: 'center', backgroundColor: '#333', color: '#fff' }}>
            <nav>
                <Link to="/" style={{ marginRight: '15px', color: '#fff' }}>Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/admin" style={{ marginRight: '15px', color: '#fff' }}>Admin</Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: '15px', color: '#fff' }}>Login</Link>
                        <Link to="/register" style={{ color: '#fff' }}>Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;