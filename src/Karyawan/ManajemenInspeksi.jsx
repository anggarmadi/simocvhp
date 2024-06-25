import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/sidebarkaryawan';
import DynamicTitle from '../Components/title';
import '../css/ManajemenInspeksi.css';
import Pagination from '../Components/pagination';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';

function ManajemenInspeksi() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataLaporan, setDataLaporan] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchDataInspeksi(currentPage);
    }, [currentPage]);

    const fetchDataInspeksi = async (page = 1) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/myInspection', {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    page: page,
                    limit: itemsPerPage,
                },
            });
            setDataLaporan(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching inspection data:', error);
        }
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

    return (
        <div className='relative h-screen flex'>
            <div className='Sidebar'>
                <Sidebar />
            </div>
            <div className='content p-6 bg-white-100 w-full'>
                <div className='kepalanya'>
                    <DynamicTitle text='Manajemen Inspeksi' />
                </div>
                <div className='table-inspeksi'>
                    <table className='custom-inspeksi'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Perusahaan</th>
                                <th className='px-4 py-2'>Alamat</th>
                                <th className='px-4 py-2'>Tanggal</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataLaporan.length > 0 ? (
                                dataLaporan.map((item, index) => (
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
                                                    to={`/forminspeksi/${item.id}`}
                                                >
                                                    <img
                                                        src='/img/edit.svg'
                                                        alt='Edit'
                                                        className='cursor-pointer'
                                                    />
                                                </Link>
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
                                        Belum ada inspeksi
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
        </div>
    );
}

export default ManajemenInspeksi;
