// Button.js

import React from 'react';

function Button({ type, text, onClick, color, label }) {
    return (
        <button
            type={type}
            className={`custom-button ${color} px-4 py-2 rounded-lg mr-2`}
            onClick={onClick}
        >
            {label || text}{' '}
            {/* Jika label diberikan, gunakan label, jika tidak, gunakan text */}
        </button>
    );
}

export default Button;
