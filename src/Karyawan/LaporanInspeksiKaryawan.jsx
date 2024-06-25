import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebarkaryawan';
import axios from 'axios';
import DynamicTitle from '../Components/title';
import '../css/LaporanInspeksiKaryawan.css';
import Loading from '../Components/loadingKaryawan';
import Pagination from '../Components/pagination';
import { Link } from 'react-router-dom';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function LaporanInspeksiKaryawan() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        getCompany(currentPage);
    }, [currentPage]);
    const getCompany = async (page = 1) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/customer', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,
                    limit: itemsPerPage,
                },
            });
            console.log(response.data.data);
            if (response.status === 200) {
                setDataCustomer(response.data.data);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const totalPages = Math.ceil(dataCustomer.length / itemsPerPage);

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
    // const currentItems = dataCustomer.slice(indexOfFirstItem, indexOfLastItem);

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
                    <DynamicTitle text='Laporan Inspeksi' />
                </div>
                <div className='table-inspeksi'>
                    <table className='custom-inspeksi'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 '>No</th>
                                <th className='px-4 py-2 '>
                                    Daftar Perusahaan
                                </th>
                                <th className='px-4 py-2 '>Alamat</th>
                                <th className='px-4 py-2 '>Detail Inspeksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataCustomer.length > 0 ? (
                                dataCustomer.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2 text-center'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.company_name}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.address}
                                        </td>

                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <Link
                                                    to={`/detailinspeksikaryawan/${item.id}`}
                                                >
                                                    <img
                                                        src='/img/info.svg'
                                                        alt='Info'
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
                                        colSpan='3'
                                    >
                                        Belum ada laporan inspeksi
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
        </div>
    );
}

export default LaporanInspeksiKaryawan;
