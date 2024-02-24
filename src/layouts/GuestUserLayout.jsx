import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';


GuestUserLayout.propTypes = {
    children: PropTypes.any
}

export default function GuestUserLayout({ children }) {

    useEffect(() => {
        // Here we can check is user is authenticated or not
        // If the user is authenticated then we can redirect the user to dashboard else we can redirect the user to login screen or landing page
    }, []);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
            {children}
            <Outlet />
        </div>
    )
}
