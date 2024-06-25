import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

export function CardWithLink({ title, description, logo }) {
    const handleClick = () => {
        console.log('Kartu diklik!');
    };

    return (
        <>
            {/* Kontainer Kartu */}
            <div
                className='w-60 cursor-pointer overflow-hidden'
                onClick={handleClick}
            >
                {/* <Card className='shadow-none relative-none'> */}
                <CardBody className='border border-gray p-4'>
                    <img src={logo} alt='Logo' className='mb-4 h-12 w-12' />
                    <Typography variant='h5' color='blue-gray'>
                        {title}
                    </Typography>
                    <Typography>{description} </Typography>
                </CardBody>
                {/* </Card> */}
            </div>
        </>
    );
}
