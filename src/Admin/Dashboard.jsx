import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import { CardWithLink } from '../Components/card';
import axios from 'axios';
import '../css/Dashboard.css';
import Loading from '../Components/loading';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';

function Dashboard() {
    const navigate = useNavigate();
    const [dash, setDash] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getDataDashboard();
    }, []);
    const getDataDashboard = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDash(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (loading) {
        return <Loading />;
    }
    return (
        <div className=' h-screen relative flex'>
            <Sidebar />

            <div className='ml-8 flex h-2' style={{ marginTop: '50px' }}>
                <Link to='/manajemenkaryawan'>
                    <CardWithLink
                        title='Jumlah Karyawan'
                        description={dash.data.sumKaryawan}
                        logo='/img/orang.svg'
                    />
                </Link>
            </div>
            <div className='ml-4 h-2' style={{ marginTop: '50px' }}>
                <Link to='/customer'>
                    <CardWithLink
                        title='Jumlah Customer'
                        description={dash.data.sumPelanggan}
                        logo='/img/orang.svg'
                    />
                </Link>
            </div>

            <div className='ml-6 flex h-2' style={{ marginTop: '50px' }}>
                <Link to='/datamou'>
                    <CardWithLink
                        title='Jumlah MoU'
                        description={dash.data.sumMou}
                        logo='/img/surat.svg'
                    />
                </Link>
                <div className='ml-4 h-2'>
                    <Link to='/suratmenyurat'>
                        <CardWithLink
                            title='Surat Masuk'
                            description={dash.data.sumSurat}
                            logo='/img/surat.svg'
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
