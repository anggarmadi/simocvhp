import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import '../css/ButtonKaryawan.css'; // Import CSS

function ButtonKaryawan({ text, onClick }) {
    return (
        <button onClick={onClick} className='button-karyawan'>
            {text}
        </button>
    );
}

ButtonKaryawan.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonKaryawan;
