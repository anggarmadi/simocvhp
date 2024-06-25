// components/Snackbar.js
import React from 'react';

const Snackbar = ({ message, type, onClose }) => {
    return (
        <div
            className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg transition-all duration-300 ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
            <div className='flex items-center justify-between'>
                <span className='text-white'>{message}</span>
                <button onClick={onClose} className='ml-4 text-white'>
                    ✖🐤
                </button>
            </div>
        </div>
    );
};

export default Snackbar;
