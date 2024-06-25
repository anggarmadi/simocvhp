import React from 'react';

function ConfirmVerification({ isOpen, onClose, onConfirm, onReject }) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-lg w-80'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-bold'>Verifikasi</h2>
                    <button
                        onClick={onClose}
                        className='text-black-500 hover:text-black-700 text-4xl'
                    >
                        &times;
                    </button>
                </div>
                <p className='mb-4'>Apakah Anda Menerima Berkas Ini?</p>
                <div className='flex justify-end space-x-4'>
                    <button
                        onClick={onReject}
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    >
                        Tolak
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                    >
                        Verifikasi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmVerification;
