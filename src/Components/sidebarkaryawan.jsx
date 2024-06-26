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
import { PowerIcon } from '@heroicons/react/24/solid';
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
                {/* Menu Kelola Karyawan */}

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/manajemeninspeksi'>
                        <ListItem>
                            <ListItemPrefix>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    class='size-6'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
                                    />
                                </svg>
                            </ListItemPrefix>

                            <Typography
                                color='blue-gray'
                                className='mr-auto font-normal'
                                style={{ paddingLeft: '10px' }}
                            >
                                Manajemen Inspeksi
                            </Typography>
                        </ListItem>
                    </Link>
                </div>

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/laporaninspeksikaryawan'>
                        <ListItem>
                            <ListItemPrefix>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    class='size-6'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
                                    />
                                </svg>
                            </ListItemPrefix>
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

                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/pengajuansurat'>
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
                                Pengajuan Surat
                            </Typography>
                        </ListItem>
                    </Link>
                </div>
                <div className='p-0 hover:bg-gray-200'>
                    <Link to='/karyawanprofile'>
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
                        navigate('/login');
                        setShowLogoutModal(false);
                    }}
                />
            )}
        </Card>
    );
}

export default Sidebar;
