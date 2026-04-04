import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    // Nëse dëshironi të kontrolloni rolin ADMIN, mund të dekodoni token-in ose të bëni një API call
    return children;
};

export default ProtectedRoute;