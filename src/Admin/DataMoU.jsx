import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import axios from 'axios';
import DynamicButton from '../Components/button';
import Loading from '../Components/loading';
import DynamicTitle from '../Components/title';
import Button from '../Components/buttonform';
import ConfirmDeleteModal from '../Components/confirmdeletemodal';
import Pagination from '../Components/pagination';
import '../css/DataMoU.css';
import api from '../auth/AxiosInstance';
import secureLocalStorage from 'react-secure-storage';

function DataMoU() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formTitle, setFormTitle] = useState('Tambah Data MoU');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [dataMoU, setDataMoU] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [dataNewMoU, setDataNewMoU] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});

    const itemsPerPage = 10;

    useEffect(() => {
        getDataMoU(currentPage);
        getDataCustomer();
    }, [currentPage]);

    const getDataMoU = async (page = 1) => {
        const token = secureLocalStorage.getItem('accessToken');
        const response = await api.get('/api/mou', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
                limit: itemsPerPage,
            },
        });

        setDataMoU(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
        console.log(response.data.data);
    };

    const getDataCustomer = async () => {
        const token = secureLocalStorage.getItem('accessToken');
        const response = await api.get('/api/customer', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 100,
            },
        });

        if (response.status === 200) {
            setDataCustomer(response.data.data);
            setLoading(false);
        }

        console.log(response.data.data);
    };

    const deteleMou = async (id) => {
        const token = secureLocalStorage.getItem('accessToken');
        const response = await api.delete(`/api/mou/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            getCustomers(currentPage);
            setLoading(false);
        }

        console.log(response.data);
    };

    const addDataMou = async () => {
        try {
            setLoading(true);
            const token = secureLocalStorage.getItem('accessToken');

            const formData = new FormData();
            formData.append('customerId', dataNewMoU.customerId);
            formData.append('startDate', dataNewMoU.startDate);
            formData.append('endDate', dataNewMoU.endDate);
            formData.append('mouFile', dataNewMoU.mouFile);

            const response = await api.post('/api/mou', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.status);

            getCustomers(currentPage);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleAddButtonClick = () => {
        setDataNewMoU({
            customerId: '',
            starDate: '',
            endDate: '',
            mouFile: '',
        });
        setFormVisible(!isFormVisible);
        setFormTitle('Tambah Data MoU');
    };

    const handleSimpanModal = () => {
        const validationErrors = {};
        if (!dataNewMoU?.customerId)
            validationErrors.customerId = 'Perusahaan wajib dipilih';
        if (!dataNewMoU?.startDate)
            validationErrors.startDate = 'Tanggal mulai wajib diisi';
        if (!dataNewMoU?.endDate)
            validationErrors.endDate = 'Tanggal selesai wajib diisi';
        if (!dataNewMoU?.mouFile)
            validationErrors.mouFile = 'File MoU wajib diisi';

        setErrors(validationErrors);

        console.log(Object.keys(validationErrors).length);
        console.log(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addDataMou();
            setFormVisible(false);
        }
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
        console.log(`Item with id ${deleteItemId} deleted`);
        deteleMou(deleteItemId);
        setDeleteModalOpen(false);
    };

    // const totalPages = Array.isArray(dataMoU)
    //     ? Math.ceil(dataMoU.length / itemsPerPage)
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

    const handleViewFile = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setDataNewMoU({
            ...dataNewMoU,
            mouFile: file,
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
                    <DynamicTitle text='Data MoU' />
                </div>
                <div className='button flex justify-end mb-4'>
                    <DynamicButton
                        text='Tambah MoU'
                        onClick={handleAddButtonClick}
                    />
                </div>
                <div className='table-container'>
                    <table className='custom-table'>
                        <thead className='table-header'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Nama Perusahaan</th>

                                <th className='px-4 py-2'>Tanggal Mulai</th>
                                <th className='px-4 py-2'>Tanggal Selesai</th>
                                <th className='px-4 py-2'>Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataMoU.length > 0 ? (
                                dataMoU.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='border px-4 py-2 text-center'>
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {item.customer.company_name}
                                        </td>

                                        <td className='border px-4 py-2'>
                                            {new Date(
                                                item.start_date,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className='border px-4 py-2'>
                                            {new Date(
                                                item.finish_date,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className='border px-4 py-2 '>
                                            <div className='flex justify-center space-x-2'>
                                                <img
                                                    src='/img/info.svg'
                                                    alt='Info'
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        handleViewFile(
                                                            item.file_url,
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
                                        colSpan='3'
                                    >
                                        Belum ada mou
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
                                <label>Nama Perusahaan</label>
                                <select
                                    id='role'
                                    name='role'
                                    className='input-field'
                                    onChange={(e) =>
                                        setDataNewMoU({
                                            ...dataNewMoU,
                                            customerId: e.target.value,
                                        })
                                    }
                                >
                                    <option value=''>
                                        -- Pilih Perusahaan --
                                    </option>
                                    {dataCustomer.map((item, index) => (
                                        <option value={`${item.id}`}>
                                            {item.company_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.customerId && (
                                    <p className='error'>{errors.customerId}</p>
                                )}
                            </div>

                            <div className='isinya'>
                                <label>Tanggal Mulai</label>
                                <input
                                    type='date'
                                    onChange={(e) =>
                                        setDataNewMoU({
                                            ...dataNewMoU,
                                            startDate: e.target.value,
                                        })
                                    }
                                />
                                {errors.startDate && (
                                    <p className='error'>{errors.startDate}</p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>Tanggal Selesai</label>
                                <input
                                    type='date'
                                    onChange={(e) =>
                                        setDataNewMoU({
                                            ...dataNewMoU,
                                            endDate: e.target.value,
                                        })
                                    }
                                />
                                {errors.endDate && (
                                    <p className='error'>{errors.endDate}</p>
                                )}
                            </div>
                            <div className='isinya'>
                                <label>File MoU</label>
                                <input
                                    type='file'
                                    onChange={handleFileChange}
                                />
                                {errors.mouFile && (
                                    <p className='error'>{errors.mouFile}</p>
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

export default DataMoU;
