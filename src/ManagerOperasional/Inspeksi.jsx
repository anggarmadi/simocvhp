import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebarmanager';
import DynamicTitle from '../Components/title';
import ButtonKaryawan from '../Components/buttonkaryawan';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import '../css/Inspeksi.css';
import Pagination from '../Components/pagination';
import { Link } from 'react-router-dom';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import Snackbar from '../Components/snackbar'; // Import Snackbar component
import Loading from '../Components/loadingOperasional';

function Inspeksi() {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [inspeksiData, setInspeksiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });

    const itemsPerPage = 10;

    useEffect(() => {
        fetchInspeksiData(currentPage);
    }, [currentPage]);

    const fetchInspeksiData = async (page = 1) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/inspection', {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: page, limit: itemsPerPage },
            });
            setInspeksiData(response.data.data);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching inspection data:', error);
        }
    };

    const deleteInspection = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            await api.delete(`/api/inspection/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbar({
                isVisible: true,
                message: 'Inspection deleted successfully',
                type: 'success',
            });
            fetchInspeksiData();
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error deleting inspection';
            setSnackbar({
                isVisible: true,
                message: errorMessage,
                type: 'error',
            });
            console.error('Error deleting inspection:', error);
        }
    };

    const handleDeleteButtonClick = (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteInspection(deleteItemId);
        setDeleteModalOpen(false);
    };

    const handleCloseModal = () => {
        setDeleteModalOpen(false);
    };

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
            <div className='content p-6 bg-white-100 w-full'>
                <div className='kepalanya'>
                    <DynamicTitle text='Manajemen Inspeksi' />
                </div>
                <div className='button flex justify-end mb-4'>
                    <Link to='/tambahinspeksi'>
                        <ButtonKaryawan text='Kelola Inspeksi' />
                    </Link>
                </div>
                <div className='table-inspeksi'>
                    <table className='custom-inspeksi'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 '>No</th>
                                <th className='px-4 py-2 '>Perusahaan</th>
                                <th className='px-4 py-2 '>Alamat</th>
                                <th className='px-4 py-2 '>Tanggal</th>
                                <th className='px-4 py-2 '>Status</th>
                                <th className='px-4 py-2 '>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inspeksiData.length > 0 ? (
                                inspeksiData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2 text-center'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.customer.company_name}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.customer.address}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {new Date(
                                                item.inspection_date,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.status}
                                        </td>

                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <Link
                                                    to={`/lihatinspeksi/${item.id}`}
                                                >
                                                    <img
                                                        src='/img/info.svg'
                                                        alt='Info'
                                                        className='cursor-pointer'
                                                    />
                                                </Link>

                                                <Link
                                                    to={`/editinspeksi/${item.id}`}
                                                >
                                                    <img
                                                        src='/img/edit.svg'
                                                        alt='Edit'
                                                        className='cursor-pointer'
                                                    />
                                                </Link>
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
                                        Belum ada Inspeksi
                                    </td>
                                </tr>
                            )}
                            {}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPreviousPage={handlePreviousPage}
                        onNextPage={handleNextPage}
                    />
                </div>
            </div>
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
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

export default Inspeksi;
