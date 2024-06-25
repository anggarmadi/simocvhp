import React from 'react';

function DynamicTitle({ text }) {
    return (
        <h1
            style={{
                color: '#000000',
                fontSize: '24px',
                fontWeight: 'bold',
                marginLeft: '50px',
                marginTop: '50px',
            }}
        >
            {text}
        </h1>
    );
}

export default DynamicTitle;
