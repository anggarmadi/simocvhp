import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import '../css/ButtonChangePassword.css'; // Import CSS

function ButtonChangePassword({ text, onClick }) {
    return (
        <button onClick={onClick} className='button-baru'>
            {text}
        </button>
    );
}

ButtonChangePassword.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonChangePassword;
