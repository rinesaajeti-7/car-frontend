import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: '#333',
            color: '#fff'
        }}>
            <p>&copy; 2026 Car Management. All rights reserved.</p>
        </footer>
    );
};

export default Footer;