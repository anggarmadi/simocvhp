import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { jwtDecode } from 'jwt-decode';
import RefreshToken from '../auth/RefreshToken.jsx';

const PublicRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = secureLocalStorage.getItem('accessToken');
            const refreshToken = secureLocalStorage.getItem('refreshToken');

            if (!accessToken || !refreshToken) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const exp = new Date(jwtDecode(accessToken).exp * 1000);
                if (exp > new Date()) {
                    const user = secureLocalStorage.getItem('user');
                    setIsAuthenticated(true);
                    setUserRole(user.role);
                } else {
                    const refreshSuccessful = await RefreshToken();

                    if (refreshSuccessful) {
                        const user = secureLocalStorage.getItem('user');
                        setIsAuthenticated(true);
                        setUserRole(user.role);
                    } else {
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        if (userRole === 'kalab' || userRole === 'asisten') {
            return <Navigate to='/dashboard' />;
        } else if (userRole === 'mahasiswa') {
            return <Navigate to='/buku' />;
        }
    }

    return children;
};

export default PublicRoute;
