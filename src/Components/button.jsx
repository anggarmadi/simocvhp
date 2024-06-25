import React from 'react';
import '../css/DynamicButton.css'; // Impor CSS

function DynamicButton({ text, onClick }) {
    return (
        <button onClick={onClick} className='dynamic-button'>
            {text}
        </button>
    );
}

export default DynamicButton;
