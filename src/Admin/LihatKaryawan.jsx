import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import DynamicTitle from '../Components/title';
import { Link, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';
import Loading from '../Components/loading';

function LihatKaryawan() {
    const [dataKaryawan, setDataKaryawan] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    useEffect(() => {
        getDataKaryawan();
        console.log(id);
    }, []);

    const getDataKaryawan = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDataKaryawan(response.data.data);
            setLoading(false);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    // const dataKaryawan.= {
    //     name: 'Karyawan Satu',
    //     username: 'Karyawan_01',
    //     password: 'harapanputri2006',
    //     position: 'Teknisi',
    //     startDate: '26/04/2017',
    //     address: 'Limau Manis, Kec. Pauh',
    //     phone: '089xxxxxxxxx',
    //     birthDate: '10/08/1997',
    // };
    if (loading) {
        return <Loading />;
    }

    return (
        <div className='relative h-screen flex'>
            <Sidebar />
            <div className='flex-grow p-8'>
                <DynamicTitle text='Lihat Data Karyawan' />
                <div className='detail-container mt-6 p-8 bg-white shadow-lg rounded-lg'>
                    <div className='detail-item bg-yellow-100 p-2 rounded mb-2'>
                        Nama Lengkap : {dataKaryawan.user_name}
                    </div>
                    <div className='detail-item bg-gray-100 p-2 rounded mb-2'>
                        Username : {dataKaryawan.username}
                    </div>
                    <div className='detail-item bg-yellow-100 p-2 rounded mb-2'>
                        Tanggal Lahir :{' '}
                        {new Date(dataKaryawan.birth_date).toLocaleDateString(
                            'id-ID',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            },
                        )}
                    </div>
                    <div className='detail-item bg-gray-100 p-2 rounded mb-2'>
                        Jabatan : {dataKaryawan.position}
                    </div>
                    <div className='detail-item bg-yellow-100 p-2 rounded mb-2'>
                        Tanggal Masuk :{' '}
                        {new Date(dataKaryawan.join_date).toLocaleDateString(
                            'id-ID',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            },
                        )}
                    </div>
                    <div className='detail-item bg-gray-100 p-2 rounded mb-2'>
                        Alamat : {dataKaryawan.address}
                    </div>
                    <div className='detail-item bg-yellow-100 p-2 rounded mb-2'>
                        No Handphone : {dataKaryawan.phone_number}
                    </div>
                    {/* <div className='detail-item bg-gray-100 p-2 rounded mb-2'>
                        Tanggal Lahir :{' '}
                        {new Date(dataKaryawan.birth_date).toLocaleDateString(
                            'id-ID',
                            {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            },
                        )}
                    </div> */}
                    <div className='flex justify-center mt-6'>
                        <Link to='/manajemenkaryawan'>
                            <button className='bg-red-500 text-white px-4 py-2 rounded'>
                                Tutup
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LihatKaryawan;
