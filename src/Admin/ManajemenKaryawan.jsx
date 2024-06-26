import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import { Link } from 'react-router-dom';
import DynamicButton from '../Components/button';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import Loading from '../Components/loading';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import '../css/ManajemenKaryawan.css';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';
import Snackbar from '../Components/snackbar';

function ManajemenKaryawan() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formTitle, setFormTitle] = useState('Tambah Data Karyawan');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataKaryawan, setDataKaryawan] = useState([]);
    const [selectedKaryawan, setSelectedKaryawan] = useState(null);
    const [errors, setErrors] = useState({});
    const itemsPerPage = 10;

    useEffect(() => {
        getDataKaryawan(currentPage);
    }, [currentPage]);

    const getDataKaryawan = async (page = 1) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/karyawan', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,
                    limit: itemsPerPage,
                },
            });
            setDataKaryawan(response.data.data);
            setTotalPages(response.data.pagination.totalPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUserById = async (userId) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.delete(`/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log('User deleted successfully');
                getDataKaryawan(currentPage);
            } else {
                console.log('Failed to delete user');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editDataKaryawan = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');

            const response = await api.put(
                `/api/user/${selectedKaryawan.id}`,
                {
                    username: selectedKaryawan.username,
                    userName: selectedKaryawan.user_name,
                    position: selectedKaryawan.position,
                    role: selectedKaryawan.role,
                    birthDate: selectedKaryawan.birth_date,
                    joinDate: selectedKaryawan.join_date,
                    phoneNumber: selectedKaryawan.phone_number,
                    address: selectedKaryawan.address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getDataKaryawan(currentPage);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const addDataKaryawan = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');

            const response = await api.post(
                '/api/user',
                {
                    username: selectedKaryawan.username,
                    userName: selectedKaryawan.user_name,
                    password: selectedKaryawan.password,
                    position: selectedKaryawan.position,
                    role: selectedKaryawan.role,
                    birthDate: selectedKaryawan.birth_date,
                    joinDate: selectedKaryawan.join_date,
                    phoneNumber: selectedKaryawan.phone_number,
                    address: selectedKaryawan.address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getDataKaryawan(currentPage);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const formatDateToInput = (date) => {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleAddButtonClick = () => {
        setSelectedKaryawan({
            username: '',
            user_name: '',
            password: '',
            position: '',
            role: '',
            birth_date: '',
            join_date: '',
            phone_number: '',
            address: '',
        }); // Clear selected karyawan
        setFormVisible(!isFormVisible);
        setFormTitle('Tambah Data Karyawan');
    };

    const handleEditButtonClick = (karyawan) => {
        setSelectedKaryawan(karyawan);
        setFormVisible(true);
        setFormTitle('Edit Data Karyawan');
    };

    const handleDeleteButtonClick = (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setFormVisible(false);
        setErrors({});
    };

    const handleSimpanModal = () => {
        const validationErrors = {};
        if (!selectedKaryawan?.user_name)
            validationErrors.user_name = 'Nama Lengkap wajib diisi';
        if (!selectedKaryawan?.username)
            validationErrors.username = 'Username wajib diisi';
        if (!selectedKaryawan?.position)
            validationErrors.position = 'Jabatan wajib diisi';
        if (!selectedKaryawan?.role) validationErrors.role = 'Role wajib diisi';
        if (!selectedKaryawan?.phone_number)
            validationErrors.phone_number = 'Nomor HP wajib diisi';
        if (!selectedKaryawan?.address)
            validationErrors.address = 'Alamat wajib diisi';
        if (!selectedKaryawan?.join_date)
            validationErrors.join_date = 'Tanggal Masuk wajib diisi';
        if (!selectedKaryawan?.password && formTitle == 'Tambah Data Karyawan')
            validationErrors.password = 'Password wajib diisi';
        if (
            !selectedKaryawan?.birth_date &&
            formTitle == 'Tambah Data Karyawan'
        )
            validationErrors.birth_date = 'Tanggal Lahir wajib diisi';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (selectedKaryawan.id) {
                editDataKaryawan();
            } else {
                addDataKaryawan();
            }
            setFormVisible(false);
        }
    };

    const handleConfirmDelete = () => {
        console.log(`Item with id ${deleteItemId} deleted`);
        deleteUserById(deleteItemId);
        setDeleteModalOpen(false);
    };

    // const totalPages = Array.isArray(dataKaryawan)
    //     ? Math.ceil(dataKaryawan.length / itemsPerPage)
    //     : 0;

    // const totalPages = Math.ceil(dataKaryawan.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = Array.isArray(dataKaryawan)
        ? dataKaryawan.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    // const currentItems = dataKaryawan.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <Loading />;
    }
    return (
        <div className='relative h-screen flex'>
            <div className='Sidebar'>
                <Sidebar />
            </div>
            <div className='content p-6 bg-white-100 w-full'>
                <div className='judul'>
                    <DynamicTitle text='Manajemen Karyawan' />
                </div>
                <div className='button flex justify-end mb-4'>
                    <DynamicButton
                        text='Tambah Karyawan'
                        onClick={handleAddButtonClick}
                    />
                </div>
                <div className='table-container'>
                    <table className='custom-table'>
                        <thead className='table-header'>
                            <tr>
                                <th className='px-4 py-2 '>No</th>
                                <th className='px-4 py-2'>Nama Karyawan</th>
                                <th className='px-4 py-2'>Username</th>
                                <th className='px-4 py-2'>Jabatan</th>
                                <th className='px-4 py-2'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2 text-center'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.user_name}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.username}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.position}
                                        </td>

                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <Link
                                                    to={`/lihatkaryawan/${item.id}`}
                                                >
                                                    <img
                                                        src='/img/info.svg'
                                                        alt='Info'
                                                        className='cursor-pointer'
                                                    />
                                                </Link>
                                                <img
                                                    src='/img/edit.svg'
                                                    alt='Edit'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleEditButtonClick(
                                                            item,
                                                        )
                                                    }
                                                />
                                                <img
                                                    src='/img/hapus.svg'
                                                    alt='Delete'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleDeleteButtonClick(
                                                            item.id,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className='border px-4 py-2 text-center'
                                        colSpan='5'
                                    >
                                        Belum ada karyawan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPreviousPage={handlePreviousPage}
                    onNextPage={handleNextPage}
                />
            </div>
            {isFormVisible && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2 className='modal-title'>{formTitle}</h2>{' '}
                        <form>
                            <div className='isinya'>
                                <label>Nama Lengkap</label>
                                <input
                                    type='text'
                                    value={
                                        selectedKaryawan
                                            ? selectedKaryawan.user_name
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            user_name: e.target.value,
                                        })
                                    }
                                />
                                {errors.user_name && (
                                    <p className='error color-red'>
                                        {errors.user_name}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Username</label>
                                <input
                                    type='text'
                                    value={
                                        selectedKaryawan
                                            ? selectedKaryawan.username
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            username: e.target.value,
                                        })
                                    }
                                />
                                {errors.username && (
                                    <p className='error'>{errors.username}</p>
                                )}
                            </div>
                            {formTitle === 'Tambah Data Karyawan' && (
                                <div className='isinya'>
                                    <label>Password</label>
                                    <input
                                        type='password'
                                        value={
                                            selectedKaryawan
                                                ? selectedKaryawan.password
                                                : ''
                                        }
                                        onChange={(e) =>
                                            setSelectedKaryawan({
                                                ...selectedKaryawan,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    {errors.password && (
                                        <p className='error'>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            )}
                            {formTitle === 'Tambah Data Karyawan' && (
                                <div className='isinya'>
                                    <label>Tanggal Lahir</label>
                                    <input
                                        type='date'
                                        value={
                                            selectedKaryawan
                                                ? formatDateToInput(
                                                      selectedKaryawan.birth_date,
                                                  )
                                                : ''
                                        }
                                        onChange={(e) => {
                                            setSelectedKaryawan({
                                                ...selectedKaryawan,
                                                birth_date: e.target.value,
                                            });
                                        }}
                                    />
                                    {errors.birth_date && (
                                        <p className='error'>
                                            {errors.birth_date}
                                        </p>
                                    )}
                                </div>
                            )}
                            <div className='isinya'>
                                <label>Jabatan</label>
                                <input
                                    type='text'
                                    value={
                                        selectedKaryawan
                                            ? selectedKaryawan.position
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            position: e.target.value,
                                        })
                                    }
                                />
                                {errors.position && (
                                    <p className='error'>{errors.position}</p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Role</label>
                                <select
                                    id='role'
                                    name='role'
                                    className='input-field'
                                    value={
                                        selectedKaryawan
                                            ? selectedKaryawan.role
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            role: e.target.value,
                                        })
                                    }
                                >
                                    <option value=''>-- Pilih Role --</option>
                                    <option value='operasional'>
                                        Manager Operasional
                                    </option>
                                    <option value='karyawan'>Karyawan</option>
                                </select>
                                {errors.role && (
                                    <p className='error'>{errors.role}</p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Nomor HP</label>
                                <input
                                    type='text'
                                    value={
                                        selectedKaryawan
                                            ? selectedKaryawan.phone_number
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            phone_number: e.target.value,
                                        })
                                    }
                                />
                                {errors.phone_number && (
                                    <p className='error'>
                                        {errors.phone_number}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Alamat</label>
                                <input
                                    type='text'
                                    value={
                                        selectedKaryawan
                                            ? selectedKaryawan.address
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            address: e.target.value,
                                        })
                                    }
                                />
                                {errors.address && (
                                    <p className='error'>{errors.address}</p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Tanggal Masuk</label>
                                <input
                                    type='date'
                                    value={
                                        selectedKaryawan
                                            ? formatDateToInput(
                                                  selectedKaryawan.join_date,
                                              )
                                            : ''
                                    }
                                    onChange={(e) => {
                                        setSelectedKaryawan({
                                            ...selectedKaryawan,
                                            join_date: e.target.value,
                                        });
                                    }}
                                />
                                {errors.join_date && (
                                    <p className='error'>{errors.join_date}</p>
                                )}
                            </div>
                            <div className='button-group flex justify-end'>
                                <Button
                                    type='button'
                                    text='Batal'
                                    onClick={handleCloseModal}
                                    color='bg-red-500 text-white'
                                />
                                <Button
                                    type='button'
                                    label='Simpan'
                                    color='bg-green-500 text-white'
                                    onClick={handleSimpanModal}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default ManajemenKaryawan;
