import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">CarManager</Link>
                </div>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/admin" className={styles.navLink}>Admin</Link>
                            <Link to="/cars" className={styles.navLink}>All Cars</Link>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.navLink}>Login</Link>
                            <Link to="/register" className={styles.navLink}>Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;