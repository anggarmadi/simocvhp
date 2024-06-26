import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/sidebarkaryawan';
import DynamicTitle from '../Components/title';
import '../css/FormInspeksi.css';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import Snackbar from '../Components/snackbar';

function FormInspeksi() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inspectionDetails, setInspectionDetails] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [description, setDescription] = useState('');
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        fetchInspectionDetails();
        fetchProducts();
    }, []);

    const fetchInspectionDetails = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/inspectionDetail/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const details = response.data.data;
            setInspectionDetails(details);
            setDescription(details.description || '');
            fetchCustomerDetails(details.customer_id);
            fetchProductFromCustomerDetails(details.customer_id);
        } catch (error) {
            handleSnackbarError('Error fetching inspection details', error);
        }
    };

    const fetchCustomerDetails = async (customerId) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/customer/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const customerData = response.data.data;
            console.log(customerData);
            setCustomerDetails(customerData);
        } catch (error) {
            handleSnackbarError('Error fetching customer details', error);
        }
    };

    const fetchProductFromCustomerDetails = async (customerId) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(
                `/api/customerDetails/${customerId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const customerData = response.data.data;
            setCustomerDetails(customerData);
            setItems(
                customerData.map((item) => ({
                    product_id: item.product_id,
                    product_name: item.product.product_name,
                    product_type: item.product.product_type.product_type,
                    qty: item.qty,
                })),
            );
        } catch (error) {
            handleSnackbarError('Error fetching customer details', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/product', {
                headers: { Authorization: `Bearer ${token}` },
                params: { limit: 100 },
            });
            const productData = response.data.data;
            setProducts(productData);
        } catch (error) {
            handleSnackbarError('Error fetching products', error);
        }
    };

    const handleAddRow = () => {
        setItems([
            ...items,
            { product_id: '', product_name: '', product_type: '', qty: '' },
        ]);
    };

    const handleRemoveRow = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleProductChange = (index, event) => {
        const selectedProduct = products.find(
            (product) => product.id === parseInt(event.target.value),
        );
        const newItems = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    product_id: selectedProduct.id,
                    product_name: selectedProduct.product_name,
                    product_type: selectedProduct.product_type.product_type,
                };
            }
            return item;
        });
        setItems(newItems);
    };

    const handleQtyChange = (index, event) => {
        const newItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, qty: event.target.value };
            }
            return item;
        });
        setItems(newItems);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = secureLocalStorage.getItem('accessToken');
            await api.put(
                `/api/inspection/${id}`,
                { description, items },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setSnackbar({
                isVisible: true,
                message: 'Inspeksi updated successfully',
                type: 'success',
            });
            navigate('/manajemeninspeksi');
        } catch (error) {
            handleSnackbarError('Error updating inspeksi', error);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleSnackbarError = (message, error) => {
        const errorMessage = error.response?.data?.message || message;
        setSnackbar({
            isVisible: true,
            message: errorMessage,
            type: 'error',
        });
        console.error(message, error);
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
                    <DynamicTitle text='Inspeksi' />
                </div>

                {inspectionDetails && customerDetails ? (
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Perusahaan</label>
                            <input
                                type='text'
                                className='form-control'
                                value={customerDetails.company_name}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Alamat</label>
                            <input
                                type='text'
                                className='form-control'
                                value={customerDetails.address}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Nama Customer</label>
                            <input
                                type='text'
                                className='form-control'
                                value={customerDetails.customer_name}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Tanggal</label>
                            <input
                                type='date'
                                className='form-control'
                                value={formatDate(
                                    inspectionDetails.inspection_date,
                                )}
                                readOnly
                            />
                        </div>
                        <div className='form-group'>
                            <label>Barang</label>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Barang</th>
                                        <th>Tipe Barang</th>
                                        <th>Jumlah</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <select
                                                    name='product_name'
                                                    value={item.product_id}
                                                    onChange={(e) =>
                                                        handleProductChange(
                                                            index,
                                                            e,
                                                        )
                                                    }
                                                    className='form-control'
                                                >
                                                    <option value=''>
                                                        Pilih Barang
                                                    </option>
                                                    {products.map((product) => (
                                                        <option
                                                            key={product.id}
                                                            value={product.id}
                                                        >
                                                            {
                                                                product.product_name
                                                            }
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type='text'
                                                    name='product_type'
                                                    value={item.product_type}
                                                    readOnly
                                                    className='form-control'
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type='number'
                                                    name='qty'
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        handleQtyChange(
                                                            index,
                                                            e,
                                                        )
                                                    }
                                                    className='form-control'
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        handleRemoveRow(index)
                                                    }
                                                    className='btn btn-danger'
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                type='button'
                                onClick={handleAddRow}
                                className='btn btn-primary mt-2'
                            >
                                Tambah Barang
                            </button>
                        </div>
                        <div className='form-group'>
                            <label>Keterangan</label>
                            <textarea
                                className='form-control'
                                rows='4'
                                value={description}
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>
                        <button type='submit' className='btn btn-success'>
                            Simpan
                        </button>
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

export default FormInspeksi;
