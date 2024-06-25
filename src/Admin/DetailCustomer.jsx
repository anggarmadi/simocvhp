import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import DynamicButton from '../Components/button';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';
import { useParams } from 'react-router-dom';
import Loading from '../Components/loading';

function DetailCustomer() {
    const { idCustomer } = useParams();

    const [isFormVisible, setFormVisible] = useState(false);
    const [formTitle, setFormTitle] = useState('Tambah Data MoU');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [newDetail, setNewDetail] = useState(null);
    const [customerDetail, setCustomerDetail] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        getCustomerDetails(currentPage);
        getProduct();
        getCustomer();
    }, [currentPage]);

    const getCustomer = async () => {
        try {
            setLoading(true);

            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/customer/${idCustomer}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setCustomer(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getProduct = async () => {
        try {
            setLoading(true);

            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/product', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setProduct(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getCustomerDetails = async (page = 1) => {
        try {
            setLoading(true);

            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(
                `/api/customerDetails/${idCustomer}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: page,
                        limit: itemsPerPage,
                    },
                },
            );
            console.log(response.data);
            if (response.status === 200) {
                setCustomerDetail(response.data.data);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteById = async (id) => {
        try {
            setLoading(true);

            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.delete(
                `/api/customerDetails/${idCustomer}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getCustomerDetails();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addDetailCustomer = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.post(
                `/api/customerDetails/${idCustomer}`,
                {
                    productId: newDetail.produk,
                    qty: newDetail.qty,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getCustomerDetails();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSimpanModal = () => {
        const validationErrors = {};
        if (!newDetail?.produk)
            validationErrors.produk = 'Nama Barang wajib diisi';
        if (!newDetail?.qty) validationErrors.qty = 'Jumlah Barang wajib diisi';
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addDetailCustomer();
            setFormVisible(false);
        }
    };

    const handleAddButtonClick = () => {
        setNewDetail({
            product: '',
            qty: '',
        });
        setFormVisible(!isFormVisible);
        setFormTitle('Tambah Data Barang');
    };

    const handleCloseModal = () => {
        setFormVisible(false);
        setErrors({});
    };

    const handleDeleteButtonClick = (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteById(deleteItemId);
        console.log(`Item with id ${deleteItemId} deleted`);
        setDeleteModalOpen(false);
    };

    // const totalPages = Array.isArray(customerDetail)
    //     ? Math.ceil(customerDetail.length / itemsPerPage)
    //     : 0;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='relative h-screen flex'>
            <div className='Sidebar'>
                <Sidebar />
            </div>
            <div className='content p-6 bg-white-100 w-full'>
                <div className='judul'>
                    <DynamicTitle
                        text={`Data Barang : ${customer.company_name}`}
                    />
                </div>
                <div className='button flex justify-end mb-4'>
                    <DynamicButton
                        text='Kelola Barang'
                        onClick={handleAddButtonClick}
                    />
                </div>
                <div className='table-container'>
                    <table className='custom-table'>
                        <thead className='table-header'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Nama Barang</th>

                                <th className='px-4 py-2'>Qty</th>
                                <th className='px-4 py-2'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerDetail.length > 0 ? (
                                customerDetail.map((item, index) => (
                                    <tr>
                                        <td className='border px-4 py-2 '>
                                            {index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.product.product_name}
                                        </td>

                                        <td className='border px-4 py-2'>
                                            {item.qty}
                                        </td>

                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <img
                                                    src='/img/hapus.svg'
                                                    alt='Delete'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleDeleteButtonClick(
                                                            item.product_id,
                                                        )
                                                    }
                                                />
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
                                        Belum ada Detail Customer
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPreviousPage={handlePreviousPage}
                    onNextPage={handleNextPage}
                />
            </div>
            {isFormVisible && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2 className='modal-title'>{formTitle}</h2>{' '}
                        {/* Gunakan formTitle untuk menampilkan judul */}
                        <form>
                            <div className='isinya'>
                                <label>Nama Barang</label>
                                <select
                                    id='role'
                                    name='role'
                                    className='input-field'
                                    onChange={(e) =>
                                        setNewDetail({
                                            ...newDetail,
                                            produk: e.target.value,
                                        })
                                    }
                                >
                                    <option value=''>-- Pilih Barang --</option>
                                    {product.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.product_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.produk && (
                                    <p className='error'>{errors.produk}</p>
                                )}
                            </div>

                            <div className='isinya'>
                                <label>Qty</label>
                                <input
                                    type='text'
                                    onChange={(e) =>
                                        setNewDetail({
                                            ...newDetail,
                                            qty: e.target.value,
                                        })
                                    }
                                />
                                {errors.qty && (
                                    <p className='error'>{errors.qty}</p>
                                )}
                            </div>

                            <div className='button-group flex justify-end'>
                                <Button
                                    type='button'
                                    text='Batal'
                                    onClick={handleCloseModal}
                                    color='bg-red-500 text-white'
                                />

                                <Button
                                    type='button'
                                    label='Simpan'
                                    color='bg-green-500 text-white'
                                    onClick={handleSimpanModal}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default DetailCustomer;
