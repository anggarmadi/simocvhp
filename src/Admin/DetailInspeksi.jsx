import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import DynamicTitle from '../Components/title';
import DynamicButton from '../Components/button';
import Pagination from '../Components/pagination';
import '../css/DetailInspeksi.css';
import Loading from '../Components/loading';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';

function DetailInspeksi() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const itemsPerPage = 10;

    useEffect(() => {
        getDetailInspeksi();
        console.log(id);
    }, [id]);

    const getDetailInspeksi = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/inspection', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data);
            setData(response.data.data);
            if (response.status === 200) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('datanya: ', data);
    }, [data]);

    // const totalPages = Math.ceil(data.length / itemsPerPage);
    const totalPages = Array.isArray(data)
        ? Math.ceil(data.length / itemsPerPage)
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
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const currentItems = Array.isArray(data)
        ? data.slice(indexOfFirstItem, indexOfLastItem)
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
                <div className='kepalanya'>
                    <DynamicTitle text='Detail Inspeksi' />
                </div>
                <div className='table-detail'>
                    <table className='custom-detail'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 '>No</th>
                                <th className='px-4 py-2 '>
                                    Karyawan Inspeksi
                                </th>
                                <th className='px-4 py-2 '>Nama Customer</th>
                                <th className='px-4 py-2 '>Tanggal</th>
                                <th className='px-4 py-2 '>
                                    Tanggal Di Inspeksi
                                </th>
                                {/* <th className='px-4 py-2 '>Tipe Barang</th> */}
                                <th className='px-4 py-2 '>Keterangan</th>
                                <th className='px-4 py-2 '>Status</th>
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
                                            {item.customer.customer_name}
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
                                            {new Date(
                                                item.updatedAt,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        {/* <td className='border px-4 py-2'>
                                        {item.tipebarang}
                                    </td> */}
                                        {/* <td className='border px-4 py-2'>
                                        {item.qty}
                                    </td> */}
                                        <td className='border px-4 py-2'>
                                            {item.description}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className='border px-4 py-2 text-center'
                                        colSpan='7'
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

export default DetailInspeksi;
