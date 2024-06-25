import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import DynamicTitle from '../Components/title';
import DynamicButton from '../Components/button';
import ConfirmVerification from '../Components/confirmverification';
import Pagination from '../Components/pagination';
import '../css/SuratMenyurat.css';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';
import Loading from '../Components/loading';

function SuratMenyurat() {
    const [isConfirmVerificationOpen, setConfirmVerificationOpen] =
        useState(false);
    const [confirmItemId, setConfirmItemId] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSurat, setDataSurat] = useState([]);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState({});
    const itemsPerPage = 10;

    useEffect(() => {
        getSurat();
    }, []);

    const getSurat = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/letter', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDataSurat(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const confirmSurat = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.put(`/api/letter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response);
                getSurat();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const rejectSurat = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.patch(`/api/letter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log(response);
                getSurat();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddButtonClick = () => {
        setFormVisible(!isFormVisible);
    };

    const handleVerificationButtonClick = (id) => {
        setSelectedSurat(id);
        setConfirmItemId(id);
        setConfirmVerificationOpen(true);
    };

    const handleCloseVerificationModal = () => {
        setConfirmVerificationOpen(false);
        setConfirmItemId(null);
    };

    const handleConfirmVerification = () => {
        confirmSurat(selectedSurat);
        setVerificationStatus((prevState) => ({
            ...prevState,
            [confirmItemId]: 'diverifikasi',
        }));
        setConfirmVerificationOpen(false);
        setConfirmItemId(null);
    };

    const handleRejectVerification = () => {
        rejectSurat(selectedSurat);
        setVerificationStatus((prevState) => ({
            ...prevState,
            [confirmItemId]: 'ditolak',
        }));
        setConfirmVerificationOpen(false);
        setConfirmItemId(null);
    };

    const handleViewFile = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const totalPages = Array.isArray(dataSurat)
        ? Math.ceil(dataSurat.length / itemsPerPage)
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
    const currentItems = Array.isArray(dataSurat)
        ? dataSurat.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='relative h-screen flex'>
            <Sidebar className='Sidebar' />
            <div className='content p-6 bg-white-100 w-full'>
                <div className='kepalanya'>
                    <DynamicTitle text='Surat Menyurat' />
                </div>
                <div className='button flex justify-end mb-4'>
                    <Link to='/surattipe'>
                        <DynamicButton
                            text='Kategori Surat'
                            onClick={handleAddButtonClick}
                        />
                    </Link>
                </div>
                <div className='table-surat'>
                    <table className='custom-surat'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Nama Karyawan</th>
                                <th className='px-4 py-2'>Jenis Surat</th>
                                <th className='px-4 py-2'>Tanggal</th>
                                <th className='px-4 py-2'>File Surat</th>
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
                                            {item.user.user_name}
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
                                        <td className='border px-4 py-2 flex justify-center space-x-2'>
                                            <img
                                                src='/img/lihat.svg'
                                                alt='lihat'
                                                onClick={() =>
                                                    handleViewFile(
                                                        item.file_url,
                                                    )
                                                }
                                                className='cursor-pointer'
                                            />
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.status === 'diverifikasi' ? (
                                                <img
                                                    src='/img/diterima.svg'
                                                    alt='Diterima'
                                                    className='opacity-50'
                                                />
                                            ) : item.status === 'ditolak' ? (
                                                <img
                                                    src='/img/ditolak.svg'
                                                    alt='Ditolak'
                                                    className='opacity-50'
                                                />
                                            ) : (
                                                <img
                                                    src='/img/verifikasi.svg'
                                                    alt='Verifikasi'
                                                    onClick={() =>
                                                        handleVerificationButtonClick(
                                                            item.id,
                                                        )
                                                    }
                                                    className='cursor-pointer'
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className='border px-4 py-2 text-center'
                                        colSpan='6'
                                    >
                                        Belum ada surat diajukan
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
            <ConfirmVerification
                isOpen={isConfirmVerificationOpen}
                onClose={handleCloseVerificationModal}
                onConfirm={handleConfirmVerification}
                onReject={handleRejectVerification}
            />
        </div>
    );
}

export default SuratMenyurat;
