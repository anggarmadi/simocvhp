import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/sidebarmanager';
import DynamicTitle from '../Components/title';
import '../css/FormInspeksi.css';
import api from '../auth/AxiosInstance';
import Snackbar from '../Components/snackbar';

function EditInspeksi() {
    const { id } = useParams(); // Get the inspection ID from the route params
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [keepCompanies, setKeepCompanies] = useState({});
    const [selectedCompany, setSelectedCompany] = useState('');
    const [karyawan, setKaryawan] = useState([]);
    const [selectedKaryawan, setSelectedKaryawan] = useState('');
    const [inspectionDate, setInspectionDate] = useState('');
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        fetchInspectionDetails();
        fetchCompanies();
        fetchKaryawan();
    }, []);

    const fetchCompanies = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/customer', {
                headers: { Authorization: `Bearer ${token}` },
                params: { limit: 100 },
            });
            setCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const fetchKaryawan = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/employee', {
                headers: { Authorization: `Bearer ${token}` },
                params: { limit: 100 },
            });
            setKaryawan(response.data.data);
        } catch (error) {
            console.error('Error fetching karyawan:', error);
        }
    };

    const fetchCustomerDetails = async (customerId) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(
                `/api/customerDetails/${customerId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setItems(response.data.data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const fetchCustomerById = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/customer/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setKeepCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching customer :', error);
        }
    };

    const fetchInspectionDetails = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/inspectionDetail/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const inspectionData = response.data.data;
            setSelectedCompany(inspectionData.customer_id);
            setSelectedKaryawan(inspectionData.user_id);
            setInspectionDate(inspectionData.inspection_date);
            fetchCustomerById(inspectionData.customer_id);
            fetchCustomerDetails(inspectionData.customer_id);
        } catch (error) {
            console.error('Error fetching inspection details:', error);
        }
    };

    const handleCompanyChange = (event) => {
        const companyId = event.target.value;
        setSelectedCompany(companyId);
        fetchCustomerById(companyId);
        fetchCustomerDetails(companyId);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const updateInspection = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            console.log(
                'datanya ; ',
                selectedCompany,
                selectedKaryawan,
                inspectionDate,
            );
            await api.put(
                `/api/inspectionDetail/${id}`,
                {
                    customerId: selectedCompany,
                    userId: selectedKaryawan,
                    inspectionDate: inspectionDate,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setSnackbar({
                isVisible: true,
                message: 'Inspection updated successfully',
                type: 'success',
            });
            navigate('/inspeksi');
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Error updating inspection';
            setSnackbar({
                isVisible: true,
                message: errorMessage,
                type: 'error',
            });
            console.error('Error updating inspection:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validasi form
        if (!selectedCompany || !selectedKaryawan || !inspectionDate) {
            setSnackbar({
                isVisible: true,
                message: 'Please fill in all fields',
                type: 'error',
            });
            return;
        }

        updateInspection();
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, isVisible: false });
    };

    return (
        <div className='relative h-screen flex'>
            <div className='Sidebar'>
                <Sidebar />
            </div>
            <div className='content'>
                <div className='kepalanya'>
                    <DynamicTitle text='Edit Inspeksi Karyawan' />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Pilih Perusahaan</label>
                        <select
                            className='form-control'
                            value={selectedCompany}
                            onChange={handleCompanyChange}
                        >
                            <option value=''>--Pilih Perusahaan--</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.company_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Nama Customer</label>
                        <input
                            type='text'
                            className='form-control'
                            value={keepCompanies.customer_name || ''}
                            readOnly
                        />
                    </div>
                    <div className='form-group'>
                        <label>No Hp</label>
                        <input
                            type='text'
                            className='form-control'
                            value={keepCompanies.phone_number || ''}
                            readOnly
                        />
                    </div>
                    <div className='form-group'>
                        <label>Alamat</label>
                        <input
                            type='text'
                            className='form-control'
                            value={keepCompanies.address || ''}
                            readOnly
                        />
                    </div>
                    <div className='form-group'>
                        <label>Nama Karyawan</label>
                        <select
                            className='form-control'
                            value={selectedKaryawan}
                            onChange={(e) =>
                                setSelectedKaryawan(e.target.value)
                            }
                        >
                            <option value=''>--Pilih Karyawan--</option>
                            {karyawan.map((karyawan) => (
                                <option key={karyawan.id} value={karyawan.id}>
                                    {karyawan.user_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Tanggal</label>
                        <input
                            type='date'
                            className='form-control'
                            value={formatDate(inspectionDate)}
                            // value={inspectionDate}
                            onChange={(e) => setInspectionDate(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Barang</label>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Type</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product.product_name}</td>
                                        <td>
                                            {
                                                item.product.product_type
                                                    .product_type
                                            }
                                        </td>
                                        <td>{item.qty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button type='submit' className='btn btn-success'>
                        Update Inspeksi
                    </button>
                </form>
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

export default EditInspeksi;
