import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Components/sidebarmanager';
import DynamicTitle from '../Components/title';
import '../css/FormInspeksi.css';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import Snackbar from '../Components/snackbar'; // Import Snackbar component
import Loading from '../Components/loadingOperasional';

function LihatInspeksi() {
    const { id } = useParams();
    const [inspectionDetails, setInspectionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        fetchInspectionDetails();
    }, []);

    const fetchInspectionDetails = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/inspectionDetail/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInspectionDetails(response.data.data);
            setLoading(false);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                'Error fetching inspection details';
            setSnackbar({
                isVisible: true,
                message: errorMessage,
                type: 'error',
            });
            console.error('Error fetching inspection details:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

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
            <div className='content'>
                <div className='kepalanya'>
                    <DynamicTitle text='Lihat Inspeksi Karyawan' />
                </div>

                {inspectionDetails ? (
                    <form>
                        <div className='form-group'>
                            <label>Pilih Perusahaan</label>
                            <input
                                type='text'
                                className='form-control'
                                value={inspectionDetails.customer.company_name}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Alamat</label>
                            <input
                                type='text'
                                className='form-control'
                                value={inspectionDetails.customer.address}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Nama Customer</label>
                            <input
                                type='text'
                                className='form-control'
                                value={inspectionDetails.customer.customer_name}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Nama Karyawan</label>
                            <input
                                type='text'
                                className='form-control'
                                value={inspectionDetails.user.user_name}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Tanggal</label>
                            <input
                                type='text'
                                className='form-control'
                                value={formatDate(
                                    inspectionDetails.inspection_date,
                                )}
                                readOnly
                            />
                        </div>

                        <div className='form-group'>
                            <label>Keterangan</label>
                            <textarea
                                className='form-control'
                                rows='4'
                                value={inspectionDetails.description}
                                readOnly
                            ></textarea>
                        </div>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
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

export default LihatInspeksi;
