import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/sidebarkaryawan';
import DynamicTitle from '../Components/title';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import ButtonKaryawan from '../Components/buttonkaryawan';
import Snackbar from '../Components/snackbar';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import '../css/PengajuanSurat.css';
import Loading from '../Components/loadingKaryawan';

function PengajuanSurat() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [dataSurat, setDataSurat] = useState([]);
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });
    const itemsPerPage = 10;

    useEffect(() => {
        fetchDataSurat(currentPage);
    }, [currentPage]);

    const fetchDataSurat = async (page = 1) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/myLetter', {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: page, limit: itemsPerPage },
            });
            setDataSurat(response.data.data);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data surat', error);
            setLoading(false);
        }
    };

    const handleDeleteButtonClick = (id) => {
        const selectedSurat = dataSurat.find((surat) => surat.id === id);
        if (selectedSurat.status === 'diverifikasi') {
            setSnackbar({
                isVisible: true,
                message: 'Surat yang telah diverifikasi tidak dapat dihapus.',
                type: 'error',
            });
        } else if (selectedSurat.status === 'ditolak') {
            setSnackbar({
                isVisible: true,
                message: 'Surat yang telah ditolak tidak dapat dihapus.',
                type: 'error',
            });
        } else {
            setDeleteItemId(id);
            setDeleteModalOpen(true);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            await api.delete(`/api/letter/${deleteItemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDataSurat(dataSurat.filter((item) => item.id !== deleteItemId));
            setDeleteModalOpen(false);
            setSnackbar({
                isVisible: true,
                message: 'Surat berhasil dihapus',
                type: 'success',
            });
        } catch (error) {
            console.error('Error deleting surat', error);
            setDeleteModalOpen(false);
            setSnackbar({
                isVisible: true,
                message: 'Gagal menghapus surat',
                type: 'error',
            });
        }
    };

    const handleOpenFile = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleAddButtonClick = () => {
        setFormVisible(!isFormVisible);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, isVisible: false });
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
    // const currentItems = dataSurat.slice(indexOfFirstItem, indexOfLastItem);

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
                    <DynamicTitle text='Surat Menyurat' />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <div className='div'>
                        <div className='p'>
                            Silahkan unduh format surat berikut{' '}
                            <Link
                                to='https://docs.google.com/document/d/1hcuZu6cxNcCFWtnB8D9qTMOdvnm440YAgZUAJ36nxNU/edit?usp=sharing'
                                className='text-blue-600 hover:underline'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                template surat
                            </Link>
                        </div>
                    </div>
                    <Link to='/tambahpengajuansurat'>
                        <ButtonKaryawan
                            text='Tambah Pengajuan'
                            onClick={handleAddButtonClick}
                        />
                    </Link>
                </div>
                <div className='table-surat'>
                    <table className='custom-surat'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 '>No</th>
                                <th className='px-4 py-2 '>Judul Surat</th>
                                <th className='px-4 py-2 '>Jenis Surat</th>
                                <th className='px-4 py-2 '>Tanggal</th>
                                <th>Tindakan</th>
                                <th className='px-4 py-2 '>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSurat.length > 0 ? (
                                dataSurat.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2 text-center'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.tittle}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.letter_type.letter_type}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {new Date(
                                                item.tanggal_pengajuan,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </td>

                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <img
                                                    src='/img/views.svg'
                                                    alt='lihat'
                                                    onClick={() =>
                                                        handleOpenFile(
                                                            item.file_url,
                                                        )
                                                    }
                                                    className='cursor-pointer'
                                                />
                                                <Link
                                                    to={`/editpengajuansurat/${item.id}`}
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
                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                {item.status ===
                                                'diverifikasi' ? (
                                                    <img
                                                        src='/img/diterima.svg'
                                                        alt='Diterima'
                                                        className='opacity-100'
                                                    />
                                                ) : item.status ===
                                                  'ditolak' ? (
                                                    <img
                                                        src='/img/ditolak.svg'
                                                        alt='Ditolak'
                                                        className='opacity-100'
                                                    />
                                                ) : (
                                                    <img
                                                        src='/img/menunggu.svg'
                                                        alt='Verifikasi'
                                                    />
                                                )}
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
                                        Belum ada tipe surat
                                    </td>
                                </tr>
                            )}
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
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
            {snackbar.isVisible && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={handleSnackbarClose}
                />
            )}
        </div>
    );
}

export default PengajuanSurat;
