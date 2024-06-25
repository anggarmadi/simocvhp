import React, { useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import api from './auth/AxiosInstance';
import Snackbar from './Components/snackbar'; // Import Snackbar component

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === '') {
            setSnackbar({
                isVisible: true,
                message: 'Username masih kosong',
                type: 'error',
            });
            return;
        } else if (password === '') {
            setSnackbar({
                isVisible: true,
                message: 'Password masih kosong',
                type: 'error',
            });
            return;
        }
        try {
            const response = await api.post('/api/login', {
                username,
                password,
            });

            const result = response.data;

            if (response.status === 200) {
                secureLocalStorage.setItem('accessToken', result.accessToken);
                secureLocalStorage.setItem('refreshToken', result.refreshToken);
                secureLocalStorage.setItem('user', result.data);

                // Navigate based on role
                if (result.data.role === 'admin') {
                    navigate('/dashboard');
                } else if (result.data.role === 'karyawan') {
                    navigate('/manajemeninspeksi');
                } else if (result.data.role === 'operasional') {
                    navigate('/inspeksi');
                }
            } else {
                setSnackbar({
                    isVisible: true,
                    message: result.data.errors[0] || 'Login failed',
                    type: 'error',
                });
            }
        } catch (error) {
            console.log('Error: ', error);
            setSnackbar({
                isVisible: true,
                message:
                    error.response?.data?.errors[0] ||
                    error.response?.data.msg ||
                    'Login failed',
                type: 'error',
            });
        }
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, isVisible: false });
    };

    return (
        <div className='login-background'>
            <div
                className='flex flex-col gap-y-4 p-8 bg-white rounded-lg shadow-lg'
                style={{ width: '90%', maxWidth: '400px' }}
            >
                <img
                    src='img/cvhp_logo.png'
                    alt='Logo'
                    className='mx-auto mb-4'
                    style={{ width: '100%', height: 'auto' }}
                />
                <h2
                    className='text-xl font-bold text-center mb-4'
                    style={{
                        marginTop: '-15px',
                        fontFamily: 'Montserrat, sans-serif',
                    }}
                >
                    Welcome!
                </h2>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            className='mt-0.5 p-2 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder='Username'
                            style={{ fontSize: '14px' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='mt-1 p-2 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder='Password'
                            style={{ fontSize: '14px' }}
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-custom-color text-white px-2 py-1 rounded hover:bg-custom-hover-color focus:outline-none focus:ring-2 focus:ring-custom-color focus:ring-offset-2'
                        style={{ backgroundColor: '#561C24', width: '100%' }}
                    >
                        Login
                    </button>
                </form>
            </div>
            {snackbar.isVisible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={closeSnackbar}
                />
            )}
        </div>
    );
}
