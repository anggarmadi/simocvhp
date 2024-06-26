import React from 'react';

const LandingPage = () => {
    return (
        <div>
            <header className='bg-blue-900 text-white p-4'>
                <div className=' mx-auto flex justify-between items-center'>
                    {/* <h1 className='text-2xl font-bold'>CV Harapan Putri</h1> */}
                    <img
                        src='/img/sidebarlogo.png'
                        alt='cv_hp_logo'
                        style={{ width: '150px' }}
                    />
                    <nav>
                        <ul className='flex space-x-4'>
                            <li>
                                <a href='#about' className='hover:underline'>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href='#services' className='hover:underline'>
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href='#contact' className='hover:underline'>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className='bg-blue-100 text-gray-800 py-20'>
                <div className=' mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-4'>
                        Welcome to CV Harapan Putri
                    </h2>
                    <p className='mb-8'>
                        Providing high-quality fragrance solutions for your
                        business.
                    </p>
                    <a
                        href='#about'
                        className='bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 inline-block'
                    >
                        Learn More
                    </a>
                </div>
            </section>

            <section id='about' className='py-20'>
                <div className=' mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-4'>About Us</h2>
                    <p className='mb-8'>
                        CV Harapan Putri is a leading provider of fragrance
                        solutions. Our mission is to create a pleasant and
                        inviting atmosphere for businesses through our
                        innovative products.
                    </p>
                    <img
                        // src='https://via.placeholder.com/600x400'
                        src='https://media.istockphoto.com/id/1349030917/id/foto/bisnis-dan-keuangan-melihat-gedung-perkantoran-bertingkat-tinggi-di-distrik-keuangan.jpg?s=612x612&w=0&k=20&c=xCRFxGi85P5OnN1Z6bIikeMZU4uUvEVH3T8C2jm0ygE='
                        alt='About Us'
                        className='mx-auto'
                    />
                </div>
            </section>

            <section id='services' className='bg-blue-100 py-20'>
                <div className=' mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-4'>Our Services</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='p-6 bg-white shadow-md rounded-lg'>
                            <img
                                src='https://static.wixstatic.com/media/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg'
                                // src='https://via.placeholder.com/200'
                                alt='Room Fragrance'
                                className='mx-auto mb-4'
                            />
                            <h3 className='text-2xl font-bold mb-2'>
                                Room Fragrance
                            </h3>
                            <p>
                                Providing the best scents to keep your rooms
                                fresh and inviting.
                            </p>
                        </div>
                        <div className='p-6 bg-white shadow-md rounded-lg'>
                            <img
                                src='https://static.wixstatic.com/media/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg'
                                alt='Car Fragrance'
                                className='mx-auto mb-4'
                            />
                            <h3 className='text-2xl font-bold mb-2'>
                                Car Fragrance
                            </h3>
                            <p>
                                Our products ensure your car always smells
                                great.
                            </p>
                        </div>
                        <div className='p-6 bg-white shadow-md rounded-lg'>
                            <img
                                src='https://static.wixstatic.com/media/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg'
                                alt='Customized Solutions'
                                className='mx-auto mb-4'
                            />
                            <h3 className='text-2xl font-bold mb-2'>
                                Customized Solutions
                            </h3>
                            <p>
                                Tailored fragrance solutions to meet your
                                specific needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer id='contact' className='bg-blue-900 text-white py-8'>
                <div className=' mx-auto text-center'>
                    <h2 className='text-2xl font-bold mb-4'>Contact Us</h2>
                    <p className='mb-4'>
                        Email: info@harapanputri.com | Phone: 123-456-7890
                    </p>
                    <p>&copy; 2024 CV Harapan Putri. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
