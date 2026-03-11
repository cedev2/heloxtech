import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const userStr = localStorage.getItem('helox_user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
        return <Navigate to="/admin" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to their own dashboard if they are on the wrong one
        if (user.role === 'CEO') return <Navigate to="/admin/ceo" replace />;
        if (user.role === 'Secretary') return <Navigate to="/admin/secretary" replace />;
        if (user.role === 'Programmer') return <Navigate to="/admin/programmer" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
