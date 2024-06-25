import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import DynamicTitle from '../Components/title';
import CardProfile from '../Components/cardprofile';
import Button from '../Components/buttonform';
import Loading from '../Components/loading';
import Snackbar from '../Components/snackbar';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import '../css/AdminProfile.css';
import '../css/CardProfile.css';

function AdminProfile() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formTitle, setFormTitle] = useState('Edit Profile');
    const [formData, setFormData] = useState({
        user_name: '',
        username: '',
        address: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
    });
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const user = secureLocalStorage.getItem('user');
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setProfileData(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditButtonClick = () => {
        setFormVisible(true);
        setFormTitle('Edit Profile Admin');
        setFormData({
            user_name: profileData.user_name,
            username: profileData.username,
            address: profileData.address,
            phone_number: profileData.phone_number,
            oldPassword: '',
            newPassword: '',
        });
    };

    const handleChangePasswordClick = () => {
        setFormVisible(true);
        setFormTitle('Ganti Password');
        setFormData({
            user_name: '',
            username: '',
            address: '',
            phone_number: '',
            oldPassword: '',
            newPassword: '',
        });
    };

    const handleCloseModal = () => {
        setFormVisible(false);
        setErrors({});
        setFormData({
            user_name: '',
            username: '',
            address: '',
            phone_number: '',
            oldPassword: '',
            newPassword: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const validationErrors = {};
        if (formTitle === 'Ganti Password') {
            if (!formData.oldPassword)
                validationErrors.oldPassword = 'Password Lama wajib diisi';
            if (!formData.newPassword)
                validationErrors.newPassword = 'Password Baru wajib diisi';
        } else {
            if (!formData.user_name)
                validationErrors.user_name = 'Nama Lengkap wajib diisi';
            if (!formData.username)
                validationErrors.username = 'Username wajib diisi';
            if (!formData.address)
                validationErrors.address = 'Email wajib diisi';
            if (!formData.phone_number)
                validationErrors.phone_number = 'Phone wajib diisi';
        }
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const user = secureLocalStorage.getItem('user');
            const token = secureLocalStorage.getItem('accessToken');
            if (formTitle === 'Ganti Password') {
                await api.post(
                    '/api/change-password',
                    {
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setSnackbar({
                    isVisible: true,
                    message: 'Password berhasil diubah',
                    type: 'success',
                });
            } else {
                await api.put(
                    `/api/user/${user.id}`,
                    {
                        userName: formData.user_name,
                        username: formData.username,
                        address: formData.address,
                        phoneNumber: formData.phone_number,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setSnackbar({
                    isVisible: true,
                    message: 'Profile berhasil diubah',
                    type: 'success',
                });
            }
            fetchProfileData();
            setFormVisible(false);
        } catch (error) {
            console.log(error);
            setSnackbar({
                isVisible: true,
                message: 'Terjadi kesalahan, silakan coba lagi',
                type: 'error',
            });
        }
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, isVisible: false });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='relative h-screen flex'>
            <div className='Sidebar'>
                <Sidebar />
            </div>
            <div className='flex flex-col w-full p-4'>
                <DynamicTitle text='Profile' />
                <div className='flex justify-center items-center flex-grow'>
                    <CardProfile
                        profileData={profileData}
                        handleEditButtonClick={handleEditButtonClick}
                        handleChangePasswordClick={handleChangePasswordClick}
                    />
                </div>
            </div>
            {isFormVisible && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2 className='modal-title'>{formTitle}</h2>
                        <form onSubmit={handleSubmit}>
                            {formTitle === 'Ganti Password' ? (
                                <>
                                    <div className='isinya'>
                                        <label>Password Lama</label>
                                        <input
                                            type='password'
                                            name='oldPassword'
                                            value={formData.oldPassword}
                                            onChange={handleInputChange}
                                        />
                                        {errors.oldPassword && (
                                            <p className='error'>
                                                {errors.oldPassword}
                                            </p>
                                        )}
                                    </div>
                                    <div className='isinya'>
                                        <label>Password Baru</label>
                                        <input
                                            type='password'
                                            name='newPassword'
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                        />
                                        {errors.newPassword && (
                                            <p className='error'>
                                                {errors.newPassword}
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='isinya'>
                                        <label>Nama Lengkap</label>
                                        <input
                                            type='text'
                                            name='user_name'
                                            value={formData.user_name}
                                            onChange={handleInputChange}
                                        />
                                        {errors.user_name && (
                                            <p className='error'>
                                                {errors.user_name}
                                            </p>
                                        )}
                                    </div>
                                    <div className='isinya'>
                                        <label>Username</label>
                                        <input
                                            type='text'
                                            name='username'
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        {errors.username && (
                                            <p className='error'>
                                                {errors.username}
                                            </p>
                                        )}
                                    </div>
                                    <div className='isinya'>
                                        <label>Email</label>
                                        <input
                                            type='text'
                                            name='address'
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                        {errors.address && (
                                            <p className='error'>
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>
                                    <div className='isinya'>
                                        <label>Phone</label>
                                        <input
                                            type='text'
                                            name='phone_number'
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                        />
                                        {errors.phone_number && (
                                            <p className='error'>
                                                {errors.phone_number}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className='button-group flex justify-end'>
                                <Button
                                    type='button'
                                    text='Batal'
                                    onClick={handleCloseModal}
                                    color='bg-red-500 text-white'
                                />
                                <Button
                                    type='submit'
                                    text='Simpan'
                                    color='bg-green-500 text-white'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
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

export default AdminProfile;
