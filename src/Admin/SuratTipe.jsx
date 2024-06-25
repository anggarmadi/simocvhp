import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import DynamicButton from '../Components/button';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import '../css/SuratTipe.css';
import Loading from '../Components/loading';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function SuratTipe() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formTitle, setFormTitle] = useState('Tambah Tipe Surat');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [newTipe, setNewTipe] = useState(true);
    const [dataJenisSurat, setDataJenisSurat] = useState([]);
    const [errors, setErrors] = useState({});

    const itemsPerPage = 10;

    const getTipeSurat = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/letterType', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.status);
            if (response.status === 200) {
                setDataJenisSurat(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addTipeSurat = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');

            const response = await api.post(
                '/api/letterType',
                {
                    letterType: newTipe.letterType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getTipeSurat();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSimpanModal = () => {
        const validationErrors = {};
        if (!newTipe?.letterType)
            validationErrors.letterType = 'Tipe Surat wajib diisi';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addTipeSurat();
            setFormVisible(false);
        }
    };

    const deleteTipeSuratById = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.delete(`/api/letterType/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log('User deleted successfully');
                getTipeSurat();
            } else {
                console.log('Failed to delete user');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTipeSurat();
    }, []);

    const handleAddButtonClick = () => {
        setNewTipe({
            letterType: '',
        });
        setFormVisible(!isFormVisible);
        setFormTitle('Tambah Tipe Surat');
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
        console.log(`Item with id ${deleteItemId} deleted`);
        deleteTipeSuratById(deleteItemId);
        setDeleteModalOpen(false);
    };

    const totalPages = Array.isArray(dataJenisSurat)
        ? Math.ceil(dataJenisSurat.length / itemsPerPage)
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

    const currentItems = Array.isArray(dataJenisSurat)
        ? dataJenisSurat.slice(indexOfFirstItem, indexOfLastItem)
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
                    <DynamicTitle text='Tipe Surat' />
                </div>
                <div className='button flex justify-end mb-4'>
                    <DynamicButton
                        text='Tambah Tipe Surat'
                        onClick={handleAddButtonClick}
                    />
                </div>
                <div className='table-tipe'>
                    <table className='custom-tipe'>
                        <thead className='table-header'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Tipe Surat</th>
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
                                            {item.letter_type}
                                        </td>
                                        <td className='border px-4 py-2 text-center'>
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
                                        Belum ada tipe surat
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
                        {/* Gunakan formTitle untuk menampilkan judul */}
                        <form>
                            <div className='isinya'>
                                <label>Tipe Surat</label>
                                <input
                                    type='text'
                                    onChange={(e) =>
                                        setNewTipe({
                                            letterType: e.target.value,
                                        })
                                    }
                                />
                                {errors.letterType && (
                                    <p className='error'>{errors.letterType}</p>
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

export default SuratTipe;
