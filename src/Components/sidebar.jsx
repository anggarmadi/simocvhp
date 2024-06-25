import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmLogoutModal from '../Components/confirmlogout';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from '@material-tailwind/react';
import {
    InboxIcon,
    UserCircleIcon,
    PowerIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import secureLocalStorage from 'react-secure-storage';

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const toggleOpen = () => setOpen(!open);

    return (
        <Card
            className='sidebar h-full w-72 p-4 shadow-xl shadow-blue-gray-900/5 bg-yellow-400'
            style={{ backgroundColor: '#F3EDC8' }}
        >
            <div className='flex items-center'>
                <img
                    src='/img/sidebarlogo.png'
                    alt='cv_hp_logo'
                    style={{ width: '250px', height: '150px' }}
                />
            </div>

            <List className='space-y-4'>
                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/dashboard'>
                        <ListItem>
                            <ListItemPrefix>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    className='h-5 w-5'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
                                    />
                                </svg>
                            </ListItemPrefix>

                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                                style={{ paddingLeft: '10px' }}
                            >
                                Dashboard
                            </Typography>
                        </ListItem>
                    </Link>
                </div>

                <ListItem className='p-0 hover:bg-gray-200'>
                    <ListItemPrefix>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-5 w-5'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                            />
                        </svg>
                    </ListItemPrefix>
                    <div
                        className='flex items-center justify-between w-full cursor-pointer'
                        onClick={() => setOpen(!open)}
                    >
                        <Typography
                            color='blue-gray'
                            className='mr-auto font-normal'
                            style={{ paddingLeft: '10px' }}
                        >
                            Kelola Karyawan
                        </Typography>
                        {open ? (
                            <ChevronDownIcon className='h-5 w-5' />
                        ) : (
                            <ChevronRightIcon className='h-5 w-5' />
                        )}
                    </div>
                </ListItem>
                {open && (
                    <>
                        <div className='p-0 pl-8 hover:bg-gray-200'>
                            <Link to='/manajemenkaryawan'>
                                <ListItem>
                                    <Typography
                                        color='blue-gray'
                                        className='mr-auto font-normal'
                                        style={{ paddingLeft: '10px' }}
                                    >
                                        Manajemen Karyawan
                                    </Typography>
                                </ListItem>
                            </Link>
                        </div>
                        <div className='p-0 pl-8 hover:bg-gray-200'>
                            <Link to='/laporaninspeksi'>
                                <ListItem>
                                    <Typography
                                        color='blue-gray'
                                        className='mr-auto font-normal'
                                        style={{ paddingLeft: '10px' }}
                                    >
                                        Laporan Inspeksi
                                    </Typography>
                                </ListItem>
                            </Link>
                        </div>
                        <div className='p-0 pl-8 hover:bg-gray-200'>
                            <Link to='/suratmenyurat'>
                                <ListItem>
                                    <Typography
                                        color='blue-gray'
                                        style={{ paddingLeft: '10px' }}
                                        className='mr-auto font-normal'
                                    >
                                        Surat Menyurat
                                    </Typography>
                                </ListItem>
                            </Link>
                        </div>
                    </>
                )}

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/datamou'>
                        <ListItem>
                            <ListItemPrefix>
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
                                        d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                                    />
                                </svg>
                            </ListItemPrefix>

                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                                style={{ paddingLeft: '10px' }}
                            >
                                Data MoU
                            </Typography>
                        </ListItem>
                    </Link>
                </div>

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/stokbarang'>
                        <ListItem>
                            <ListItemPrefix>
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
                                        d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
                                    />
                                </svg>
                            </ListItemPrefix>
                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                                style={{ paddingLeft: '10px' }}
                            >
                                Stok Barang
                            </Typography>
                        </ListItem>
                    </Link>
                </div>

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/customer'>
                        <ListItem>
                            <ListItemPrefix>
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
                                        d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
                                    />
                                </svg>
                            </ListItemPrefix>

                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                                style={{ paddingLeft: '10px' }}
                            >
                                Customer
                            </Typography>
                        </ListItem>
                    </Link>
                </div>

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/adminprofile'>
                        <ListItem>
                            <ListItemPrefix>
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
                                        d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                    />
                                </svg>
                            </ListItemPrefix>

                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                                style={{ paddingLeft: '10px' }}
                            >
                                Profile
                            </Typography>
                        </ListItem>
                    </Link>
                </div>
            </List>
            {/* Logout ListItem */}
            <ListItem
                className='p-0 mt-auto hover:bg-gray-200'
                onClick={() => setShowLogoutModal(true)}
            >
                <ListItemPrefix>
                    <PowerIcon className='h-5 w-5' />
                </ListItemPrefix>
                <Typography
                    color='blue-gray'
                    className='mr-auto font-normal pl-2'
                >
                    Log Out
                </Typography>
            </ListItem>

            {showLogoutModal && (
                <ConfirmLogoutModal
                    isOpen={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={() => {
                        // Handle logout logic here
                        secureLocalStorage.clear();
                        navigate('/');
                        setShowLogoutModal(false);
                    }}
                />
            )}
        </Card>
    );
}

export default Sidebar;
