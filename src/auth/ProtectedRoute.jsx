import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { jwtDecode } from 'jwt-decode';
import Loading from '../Components/loading.jsx';
import RefreshToken from './RefreshToken.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
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
                        if (user && user.role) {
                            console.log(
                                'Setting user role after refresh:',
                                user.role,
                            );
                            setUserRole(user.role);
                        }
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
        return Loading;
    }

    if (!isAuthenticated) {
        return <Navigate to='/' />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.log(userRole);
        return <Navigate to='/unauthorized' />;
    }

    return children;
};

export default ProtectedRoute;
