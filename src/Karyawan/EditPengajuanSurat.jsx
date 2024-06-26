import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/sidebarkaryawan';
import DynamicTitle from '../Components/title';
import Snackbar from '../Components/snackbar';
import secureLocalStorage from 'react-secure-storage';
import api from '../auth/AxiosInstance';
import '../css/EditPengajuan.css';
import Loading from '../Components/loadingKaryawan';

function EditPengajuanSurat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [letterTypes, setLetterTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        judulSurat: '',
        jenisSurat: '',
        tanggal: '',
        file: null,
    });
    const [snackbar, setSnackbar] = useState({
        isVisible: false,
        message: '',
        type: '',
    });

    useEffect(() => {
        fetchLetterTypes();
        fetchLetterData();
    }, []);

    const fetchLetterTypes = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get('/api/letterType', {
                headers: { Authorization: `Bearer ${token}` },
                params: { limit: 100 },
            });
            setLetterTypes(response.data.data);
        } catch (error) {
            console.error('Error fetching letter types', error);
            setSnackbar({
                isVisible: true,
                message: 'Error fetching letter types',
                type: 'error',
            });
        }
    };

    const fetchLetterData = async () => {
        try {
            const token = secureLocalStorage.getItem('accessToken');
            const response = await api.get(`/api/letter/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const letter = response.data.data;
            setFormData({
                judulSurat: letter.tittle,
                jenisSurat: letter.letter_type_id,
                tanggal: letter.tanggal_pengajuan,
                file: null,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching letter data', error);
            setSnackbar({
                isVisible: true,
                message: 'Error fetching letter data',
                type: 'error',
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setFormData({ ...formData, file: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            !formData.judulSurat ||
            !formData.jenisSurat ||
            !formData.tanggal ||
            !formData.file
        ) {
            setSnackbar({
                isVisible: true,
                message: 'Please fill in all fields',
                type: 'error',
            });
            return;
        }

        const token = secureLocalStorage.getItem('accessToken');
        const submitData = new FormData();
        submitData.append('tittle', formData.judulSurat);
        submitData.append('letterTypeId', formData.jenisSurat);
        submitData.append('tanggalPengajuan', formData.tanggal);
        if (formData.file) {
            submitData.append('letterFile', formData.file);
        }

        try {
            await api.put(`/api/letter/edit/${id}`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setSnackbar({
                isVisible: true,
                message: 'Surat berhasil diperbarui',
                type: 'success',
            });
            navigate('/pengajuansurat');
        } catch (error) {
            console.error('Error updating surat', error);
            setSnackbar({
                isVisible: true,
                message: 'Gagal memperbarui surat',
                type: 'error',
            });
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
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
            <div className='suratan'>
                <div className='header'>
                    <DynamicTitle text='Edit Pengajuan Surat' />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='form-surat'>
                        <label>Judul Surat</label>
                        <input
                            type='text'
                            className='form-atur'
                            name='judulSurat'
                            value={formData.judulSurat}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-surat'>
                        <label>Jenis Surat</label>
                        <select
                            id='jenisSurat'
                            name='jenisSurat'
                            className='form-atur'
                            value={formData.jenisSurat}
                            onChange={handleInputChange}
                        >
                            <option value=''>-- Pilih Jenis Surat --</option>
                            {letterTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.letter_type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-surat'>
                        <label>Tanggal</label>
                        <input
                            type='date'
                            className='form-atur'
                            name='tanggal'
                            value={formatDate(formData.tanggal)}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-surat'>
                        <label>File Surat</label>
                        <input
                            type='file'
                            className='form-atur'
                            name='file'
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className='form-surat tombol'>
                        <button type='submit' className='btn btn-success'>
                            Simpan
                        </button>
                    </div>
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

export default EditPengajuanSurat;
