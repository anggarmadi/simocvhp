import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import DynamicButton from '../Components/button';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import Loading from '../Components/loading';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';
import '../css/StokBarang.css';

function StokBarang() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formTitle, setFormTitle] = useState('Tambah Data Barang');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataStok, setDataStok] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedBarang, setSelectedBarang] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [errors, setErrors] = useState({});
    const itemsPerPage = 10;

    useEffect(() => {
        getBarang(currentPage);
        getProductTypes();
    }, [currentPage]);

    const getBarang = async (page = 1) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/product', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,
                    limit: itemsPerPage,
                },
            });
            if (response.status === 200) {
                setDataStok(response.data.data);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getProductTypes = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/productType', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setProductTypes(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteById = async (id) => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.delete(`/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getBarang();
        } catch (error) {
            console.log(error);
        }
    };

    const editDataBarang = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');
            console.log(selectedBarang);
            const response = await api.put(
                `/api/product/${selectedBarang.id}`,
                {
                    productName: selectedBarang.product_name,
                    productTypeId: selectedBarang.product_type_id,
                    stock: selectedBarang.product_stock,
                    updatedAt: selectedBarang.updatedAt,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getBarang();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const addDataBarang = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.post(
                '/api/product',
                {
                    productName: selectedBarang.product_name,
                    productTypeId: selectedBarang.product_type,
                    stock: selectedBarang.product_stock,
                    updatedAt: selectedBarang.updatedAt,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            getBarang();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const formatDateToInput = (date) => {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleAddButtonClick = () => {
        setSelectedBarang({
            product_name: '',
            product_type: '',
            product_stock: '',
            updatedAt: '',
        });
        setFormVisible(!isFormVisible);
        setFormTitle('Tambah Data Barang');
    };

    const handleEditButtonClick = (barang) => {
        setSelectedBarang(barang);
        setFormVisible(true);
        setFormTitle('Edit Data Barang');
    };

    const handleDeleteButtonClick = (id) => {
        setDeleteItemId(id);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setFormVisible(false);
        setErrors({});
    };

    const handleSimpanModal = () => {
        const validationErrors = {};
        if (!selectedBarang?.product_name)
            validationErrors.product_name = 'Nama Barang wajib diisi';
        if (!selectedBarang?.product_type)
            validationErrors.product_type = 'Tipe Barang wajib diisi';
        // if (typeof selectedBarang?.product_type === 'string') {
        //     console.log(typeof selectedBarang?.product_type);
        //     validationErrors.product_type =
        //         'Tipe Barang wajib berupa angka/integer';
        // }
        if (!selectedBarang?.product_stock)
            validationErrors.product_stock = 'Qty wajib diisi';
        if (!selectedBarang?.updatedAt)
            validationErrors.updatedAt = 'Tanggal Masuk wajib diisi';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (selectedBarang.id) {
                editDataBarang();
            } else {
                addDataBarang();
            }
            setFormVisible(false);
        }
    };

    const handleConfirmDelete = () => {
        console.log(`Item with id ${deleteItemId} deleted`);
        deleteById(deleteItemId);
        setDeleteModalOpen(false);
    };

    // const totalPages = Array.isArray(dataStok)
    //     ? Math.ceil(dataStok.length / itemsPerPage)
    //     : 0;

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
    // const currentItems = Array.isArray(dataStok)
    //     ? dataStok.slice(indexOfFirstItem, indexOfLastItem)
    //     : [];
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
                    <DynamicTitle text='Stok Barang' />
                </div>
                <div className='button-flex flex justify-end align-items-center mb-2 space-x-2'>
                    <DynamicButton
                        text='Tambah Barang'
                        onClick={handleAddButtonClick}
                    />
                    <Link to='/tipebarang'>
                        <DynamicButton
                            text='Kelola Tipe Barang'
                            onClick={handleAddButtonClick}
                        />
                    </Link>
                </div>

                <div className='table-stokbarang'>
                    <table className='custom-stokbarang'>
                        <thead className='table-stokbarang'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Nama Barang</th>
                                <th className='px-4 py-2'>Tipe Barang</th>
                                <th className='px-4 py-2'>Qty</th>
                                <th className='px-4 py-2'>Tanggal Masuk</th>
                                <th className='px-4 py-2'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataStok.length > 0 ? (
                                dataStok.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.product_name}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.product_type.product_type}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.product_stock}
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
                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <img
                                                    src='/img/edit.svg'
                                                    alt='Edit'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleEditButtonClick(
                                                            item,
                                                        )
                                                    }
                                                />
                                                <img
                                                    src='/img/hapus.svg'
                                                    alt='Delete'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleDeleteButtonClick(
                                                            item.id,
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
                                        Belum ada Stok Barang
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
                        <form>
                            <div className='isinya'>
                                <label>Nama Barang</label>
                                <input
                                    type='text'
                                    value={
                                        selectedBarang
                                            ? selectedBarang.product_name
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedBarang({
                                            ...selectedBarang,
                                            product_name: e.target.value,
                                        })
                                    }
                                />
                                {errors.product_name && (
                                    <p className='error'>
                                        {errors.product_name}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Tipe Barang</label>
                                <select
                                    id='role'
                                    name='role'
                                    className='input-field'
                                    value={
                                        selectedBarang
                                            ? selectedBarang.product_type
                                            : null
                                    }
                                    onChange={(e) =>
                                        setSelectedBarang({
                                            ...selectedBarang,
                                            product_type: e.target.value,
                                        })
                                    }
                                >
                                    <option value={null}>
                                        -- Tipe Barang --
                                    </option>
                                    {productTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.product_type}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_type && (
                                    <p className='error'>
                                        {errors.product_type}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Qty</label>
                                <input
                                    type='text'
                                    value={
                                        selectedBarang
                                            ? selectedBarang.product_stock
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedBarang({
                                            ...selectedBarang,
                                            product_stock: e.target.value,
                                        })
                                    }
                                />
                                {errors.product_stock && (
                                    <p className='error'>
                                        {errors.product_stock}
                                    </p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Tanggal Masuk</label>
                                <input
                                    type='date'
                                    value={
                                        selectedBarang
                                            ? formatDateToInput(
                                                  selectedBarang.updatedAt,
                                              )
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedBarang({
                                            ...selectedBarang,
                                            updatedAt: e.target.value,
                                        })
                                    }
                                />
                                {errors.updatedAt && (
                                    <p className='error'>{errors.updatedAt}</p>
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

export default StokBarang;
