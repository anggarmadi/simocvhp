import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const mainSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const serviceSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <header className='bg-yellow-900 text-white p-1'>
                <div className='mx-auto flex justify-between items-center'>
                    <img
                        className='ml-4'
                        src='/img/sidebarlogo.png'
                        alt='cv_hp_logo'
                        style={{ width: '150px' }}
                    />
                    <nav>
                        <ul className='flex space-x-4 mr-4'>
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

            <section
                className='bg-yellow-50 text-gray-800 py-20'
                data-aos='fade-up'
            >
                <div className='mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-4'>
                        Welcome to CV Harapan Putri
                    </h2>
                    <p className='mb-8'>
                        Providing high-quality fragrance solutions for your
                        business.
                    </p>
                    <a
                        href='#about'
                        className='bg-yellow-900 text-white px-6 py-2 rounded-full hover:bg-yellow-700 inline-block'
                    >
                        Learn More
                    </a>
                </div>
            </section>

            <section id='about' className='' data-aos='fade-up'>
                <Slider {...mainSliderSettings}>
                    <div className='  '>
                        <img
                            src='../public/img/ClientSatu.jpg'
                            alt='Room Fragrance'
                            className='mx-auto mb-4'
                            style={{
                                height: '1000px',
                            }}
                        />
                    </div>
                    <div>
                        <img
                            src='../public/img/ClientDua.jpg'
                            alt='Room Fragrance'
                            className='mx-auto mb-4'
                            style={{
                                height: '1000px',
                            }}
                        />
                    </div>
                    <div>
                        <img
                            src='../public/img/cvharapanputri.png'
                            alt='Room Fragrance'
                            className='mx-auto mb-4'
                            style={{
                                height: '1000px',
                            }}
                        />
                    </div>
                </Slider>
                <div className='mx-auto text-center bg-opacity-50 bg-black text-white p-10'>
                    <h2 className='text-4xl font-bold mb-4'>About Us</h2>
                    <p className='mb-8'>
                        CV Harapan Putri is a leading provider of fragrance
                        solutions. Our mission is to create a pleasant and
                        inviting atmosphere for businesses through our
                        innovative products.
                    </p>
                </div>
            </section>

            <section
                id='services'
                className='bg-yellow-50 py-20'
                data-aos='fade-up'
            >
                <div className='mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-4'>Our Services</h2>
                    <Slider {...serviceSliderSettings}>
                        <div className='p-6 bg-white shadow-md rounded-lg'>
                            <img
                                src='https://static.wixstatic.com/media/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d674c5_14e72071aaa149e3a44bda0995231a2d~mv2.jpg'
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
                    </Slider>
                </div>
            </section>

            <footer
                id='contact'
                className='bg-yellow-900 text-white py-8'
                data-aos='fade-up'
            >
                <div className='mx-auto text-center'>
                    <h2 className='text-2xl font-bold mb-4'>Contact Us</h2>
                    <p className='mb-4'>
                        Email: info@harapanputri.com | Phone: 123-456-7890
                    </p>
                    <div className='mb-8'>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15957.147398913301!2d100.4068193!3d-0.9352022!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b9b03357c535%3A0xfd5986cff83d3db!2sCV%20HARAPAN%20PUTRI!5e0!3m2!1sen!2sid!4v1719393951700!5m2!1sen!2sid'
                            width='600'
                            height='450'
                            style={{ border: 0 }}
                            allowFullScreen=''
                            loading='lazy'
                            className='mx-auto'
                        ></iframe>
                    </div>
                    <p>&copy; 2024 CV Harapan Putri. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
