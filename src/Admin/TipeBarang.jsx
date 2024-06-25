import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import DynamicButton from '../Components/button';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import '../css/TipeBarang.css';
import Loading from '../Components/loading';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';

function TipeBarang() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formTitle, setFormTitle] = useState('Tambah Tipe Barang');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [newTipeBarang, setNewTipeBarang] = useState('');
    const [dataJenisBarang, setDataJenisBarang] = useState([]);
    const [errors, setErrors] = useState({});

    const itemsPerPage = 10;

    useEffect(() => {
        getTipeBarang();
    }, []);

    const getTipeBarang = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/productType', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDataJenisBarang(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addTipeBarang = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.post(
                '/api/productType',
                { productType: newTipeBarang },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            if (response.status === 201) {
                getTipeBarang();
                setNewTipeBarang('');
                setFormVisible(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSimpanModal = () => {
        const validationErrors = {};
        if (!newTipeBarang)
            validationErrors.product_type = 'Tipe Barang wajib diisi';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addTipeBarang();
        }
    };

    const deleteTipeBarang = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.delete(`/api/productType/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getTipeBarang();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddButtonClick = () => {
        setNewTipeBarang('');
        setFormVisible(true);
        setFormTitle('Tambah Tipe Barang');
    };

    const handleDeleteButtonClick = (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setFormVisible(false);
        setErrors({});
    };

    const handleConfirmDelete = () => {
        deleteTipeBarang(deleteItemId);
        setDeleteModalOpen(false);
    };

    const totalPages = Array.isArray(dataJenisBarang)
        ? Math.ceil(dataJenisBarang.length / itemsPerPage)
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
    const currentItems = Array.isArray(dataJenisBarang)
        ? dataJenisBarang.slice(indexOfFirstItem, indexOfLastItem)
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
                    <DynamicTitle text='Tipe Barang' />
                </div>
                <div className='button flex justify-end mb-6'>
                    <DynamicButton
                        text='Tambah Tipe Barang'
                        onClick={handleAddButtonClick}
                    />
                </div>
                <div className='table-tipe'>
                    <table className='custom-tipe'>
                        <thead className='table-tipe'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Tipe Barang</th>
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
                                            {item.product_type}
                                        </td>
                                        <td className='border px-4 py-2 flex justify-center space-x-2'>
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
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className='border px-4 py-2 text-center'
                                        colSpan='3'
                                    >
                                        Belum ada tipe barang
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
                        {/* <form>
                            <div className='isinya'>
                                <label>Nama Tipe Barang</label>
                                <input
                                    type='text'
                                    value={newTipeBarang}
                                    onChange={(e) =>
                                        setNewTipeBarang(e.target.value)
                                    }
                                />
                                {errors.product_type && (
                                    <p className='error'>
                                        {errors.product_type}
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
                                    text='Simpan'
                                    color='bg-green-500 text-white'
                                    onClick={handleSimpanModal}
                                />
                            </div>
                        </form> */}
                        <form onSubmit={addTipeBarang}>
                            <div className='isinya'>
                                <label>Nama Tipe Barang</label>
                                <input
                                    type='text'
                                    value={newTipeBarang}
                                    onChange={(e) =>
                                        setNewTipeBarang(e.target.value)
                                    }
                                    required
                                />
                            </div>
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
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default TipeBarang;
