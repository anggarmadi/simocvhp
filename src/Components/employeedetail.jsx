import React from 'react';

const EmployeeDetail = ({ employee, onClose }) => {
    return (
        <div className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold'>Lihat Data Karyawan</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-700 text-2xl font-bold'
                    >
                        &times;
                    </button>
                </div>
                <div className='space-y-2'>
                    <div className='bg-yellow-100 p-2 rounded'>
                        Nama Lengkap : {employee.name}
                    </div>
                    <div className='bg-gray-100 p-2 rounded'>
                        Username : {employee.username}
                    </div>
                    <div className='bg-yellow-100 p-2 rounded'>
                        Password : {employee.password}
                    </div>
                    <div className='bg-gray-100 p-2 rounded'>
                        Jabatan : {employee.position}
                    </div>
                    <div className='bg-yellow-100 p-2 rounded'>
                        Tanggal Masuk : {employee.startDate}
                    </div>
                    <div className='bg-gray-100 p-2 rounded'>
                        Alamat : {employee.address}
                    </div>
                    <div className='bg-yellow-100 p-2 rounded'>
                        No Handphone : {employee.phone}
                    </div>
                    <div className='bg-gray-100 p-2 rounded'>
                        Tanggal Lahir : {employee.birthDate}
                    </div>
                </div>
                <div className='flex justify-center mt-6'>
                    <button
                        onClick={onClose}
                        className='bg-red-500 text-white px-4 py-2 rounded'
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
