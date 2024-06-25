import React from 'react';
import Button from '../Components/button'; // Ensure this path is correct
import ButtonChangePassword from '../Components/buttonchangepassword';
import '../css/CardProfile.css'; // Import CSS for styling

const CardProfile = ({
    profileData,
    handleEditButtonClick,
    handleChangePasswordClick,
}) => {
    return (
        <div className='card-profile-container'>
            <div>
                <div className='card-profile-field'>
                    <label className='card-profile-label'>Nama</label>
                    <span className='card-profile-text'>
                        {profileData.user_name}
                    </span>
                </div>
                <div className='card-profile-field'>
                    <label className='card-profile-label'>Alamat</label>
                    <span className='card-profile-text'>
                        {profileData.address}
                    </span>
                </div>
                <div className='card-profile-field'>
                    <label className='card-profile-label'>Phone</label>
                    <span className='card-profile-text'>
                        {profileData.phone_number}
                    </span>
                </div>
                <div className='card-profile-field'>
                    <label className='card-profile-label'>Username</label>
                    <span className='card-profile-text'>
                        {profileData.username}
                    </span>
                </div>
            </div>
            <div className='button-group'>
                <Button onClick={handleEditButtonClick} text='Edit' />
                <ButtonChangePassword
                    onClick={handleChangePasswordClick}
                    text='Ganti Password'
                />
            </div>
        </div>
    );
};

export default CardProfile;
