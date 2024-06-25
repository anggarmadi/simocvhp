import React from 'react';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-lg w-80'>
                <h2 className='text-lg font-bold mb-4'>
                    Konfirmasi Penghapusan
                </h2>
                <p className='mb-4'>Apakah Anda Yakin Menghapus?</p>
                <div className='flex justify-end space-x-4'>
                    <button
                        onClick={onClose}
                        className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;
