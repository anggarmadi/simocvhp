// Components/Pagination.js
import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    onPreviousPage,
    onNextPage,
}) => {
    return (
        <div className='pagination flex justify-start items-center mt-4'>
            <button
                onClick={onPreviousPage}
                disabled={currentPage === 1}
                className='px-2 py-2 border border-gray-300 rounded-l bg-white-200 hover:bg-gray-300 flex items-center justify-center'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 19.5 8.25 12l7.5-7.5'
                    />
                </svg>
            </button>

            <span className='px-5 py-2 border-t border-b border-gray-300 bg-red-800 text-white'>
                {currentPage}
            </span>
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className='px-2 py-2 border border-gray-300 rounded-r bg-white-200 hover:bg-gray-300 flex items-center justify-center'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m8.25 4.5 7.5 7.5-7.5 7.5'
                    />
                </svg>
            </button>
            <div className='text-center text-gray-600 ml-2'>
                Showing {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;
