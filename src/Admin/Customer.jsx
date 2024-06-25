import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import DynamicButton from '../Components/button';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import Loading from '../Components/loading';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import '../css/Customer.css';

function Customer() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formTitle, setFormTitle] = useState('Tambah Data Customer');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const itemsPerPage = 10;

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/customer', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDataCustomer(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteById = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.delete(`/api/customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getCustomers();
        } catch (error) {
            console.log(error);
        }
    };

    const editCustomer = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.put(
                `/api/customer/${selectedCustomer.id}`,
                {
                    customerName: selectedCustomer.customer_name,
                    companyName: selectedCustomer.company_name,
                    address: selectedCustomer.address,
                    phoneNumber: selectedCustomer.phone_number,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getCustomers();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const addCustomer = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.post(
                '/api/customer',
                {
                    customerName: selectedCustomer.customer_name,
                    companyName: selectedCustomer.company_name,
                    address: selectedCustomer.address,
                    phoneNumber: selectedCustomer.phone_number,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getCustomers();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleAddButtonClick = () => {
        setSelectedCustomer({
            customer_name: '',
            company_name: '',
            address: '',
            phone_number: '',
        });
        setFormVisible(true);
        setFormTitle('Tambah Data Customer');
    };

    const handleEditButtonClick = (customer) => {
        setSelectedCustomer(customer);
        setFormVisible(true);
        setFormTitle('Edit Data Customer');
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
        if (!selectedCustomer?.customer_name)
            validationErrors.customer_name = 'Nama Customer wajib diisi';
        if (!selectedCustomer?.company_name)
            validationErrors.company_name = 'Nama Perusahaan wajib diisi';
        if (!selectedCustomer?.address)
            validationErrors.address = 'Alamat wajib diisi';
        if (!selectedCustomer?.phone_number)
            validationErrors.phone_number = 'No Hp wajib diisi';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (selectedCustomer.id) {
                editCustomer();
            } else {
                addCustomer();
            }
            setFormVisible(false);
        }
    };

    const handleConfirmDelete = () => {
        deleteById(deleteItemId);
        setDeleteModalOpen(false);
    };

    const totalPages = Array.isArray(dataCustomer)
        ? Math.ceil(dataCustomer.length / itemsPerPage)
        : 0;
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
    const currentItems = Array.isArray(dataCustomer)
        ? dataCustomer.slice(indexOfFirstItem, indexOfLastItem)
        : [];

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
                    <DynamicTitle text='Customer' />
                </div>
                <div className='button flex justify-end mb-4'>
                    <DynamicButton
                        text='Tambah Data Customer'
                        onClick={handleAddButtonClick}
                    />
                </div>
                <div className='table-customer'>
                    <table className='custom-customer'>
                        <thead className='table-customer'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Nama Perusahaan</th>
                                <th className='px-4 py-2'>Nama Customer</th>
                                <th className='px-4 py-2'>Alamat</th>
                                <th className='px-4 py-2'>No Hp</th>
                                <th className='px-4 py-2'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.company_name}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.customer_name}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.address}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.phone_number}
                                        </td>
                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <Link
                                                    to={`/detailcustomer/${item.id}`}
                                                >
                                                    <img
                                                        src='/img/plus.svg'
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
                                        colSpan='6'
                                    >
                                        Belum ada Data Customer
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
                        <h2 className='modal-title'>{formTitle}</h2>
                        <form>
                            <div className='isinya'>
                                <label>Nama Customer</label>
                                <input
                                    type='text'
                                    value={
                                        selectedCustomer
                                            ? selectedCustomer.customer_name
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedCustomer({
                                            ...selectedCustomer,
                                            customer_name: e.target.value,
                                        })
                                    }
                                />
                                {errors.customer_name && (
                                    <p className='error'>
                                        {errors.customer_name}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Nama Perusahaan</label>
                                <input
                                    type='text'
                                    value={
                                        selectedCustomer
                                            ? selectedCustomer.company_name
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedCustomer({
                                            ...selectedCustomer,
                                            company_name: e.target.value,
                                        })
                                    }
                                />
                                {errors.company_name && (
                                    <p className='error'>
                                        {errors.company_name}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Alamat</label>
                                <input
                                    type='text'
                                    value={
                                        selectedCustomer
                                            ? selectedCustomer.address
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedCustomer({
                                            ...selectedCustomer,
                                            address: e.target.value,
                                        })
                                    }
                                />
                                {errors.address && (
                                    <p className='error'>{errors.address}</p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>No.Handphone</label>
                                <input
                                    type='text'
                                    value={
                                        selectedCustomer
                                            ? selectedCustomer.phone_number
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedCustomer({
                                            ...selectedCustomer,
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

export default Customer;
