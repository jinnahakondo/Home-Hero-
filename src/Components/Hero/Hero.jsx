import React from 'react';
import HomeVideo from '../../assets/homeClining.mp4'
import Clean from '../../assets/Clean.jpg'
import Electrician from '../../assets/elitrician.jpg'
import Gardening from '../../assets/gardening.jpg'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle'
import { Link } from 'react-router';
import SliderImg1 from '../../assets/slider-1.jpg'

const Hero = () => {


    return (
        <div className='-z-20 mt-20'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination
                loop
                autoplay={{ delay: 3000 }}
                speed={500}
            >
                {/* slide 1  */}
                <SwiperSlide>
                    <div
                        className="relative h-[70vh] w-full bg-cover bg-center flex items-center"
                        style={{
                            backgroundImage: `url(${SliderImg1})`,
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Content */}
                        <div className="relative z-10 max-w-7xl px-6 md:px-12 lg:pl-24 text-white">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Trusted Experts <br /> for Home Services
                            </h1>

                            <p className="max-w-xl text-gray-200 mb-8">
                                We provide reliable, affordable, and professional solutions for all
                                your home repair and maintenance needs — delivered on time, every time.
                            </p>

                            <Link to={'/services'} className="btn btn-primary py-3 font-semibold rounded">
                                Get Our Services
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                {/* slide 2  */}
                <SwiperSlide>
                    <div
                        className="relative h-[70vh] w-full bg-cover bg-center flex items-center"
                        style={{
                            backgroundImage: `url(${Electrician})`,
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Content */}
                        <div className="relative z-10 max-w-7xl px-6 md:px-12 lg:pl-24 text-white">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Expert Electrical Repairs <br /> & Installations
                            </h1>

                            <p className="max-w-xl text-gray-200 mb-8">
                                <p className='text-white  my-7 text-left'>From minor repairs to full wiring, our licensed electricians deliver fast and dependable service — ensuring safety and lasting performance. We’re  here to keep your home powered efficiently with quality you can trust.</p>
                            </p>

                            <Link to={'/services'} className="btn btn-primary py-3 font-semibold rounded">
                                Get Our Services
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                {/* slide 3 */}
                <SwiperSlide>
                    <div
                        className="relative h-[70vh] w-full bg-cover bg-center flex items-center"
                        style={{
                            backgroundImage: `url(${Gardening})`,
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Content */}
                        <div className="relative z-10 max-w-7xl px-6 md:px-12 lg:pl-24 text-white">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Professional Gardening & <br /> Landscaping Service
                            </h1>

                            <p className='text-white text-left my-7'>Bring your outdoor space to life with our expert gardening services — from lawn care <br /> and plant maintenance to landscape design. We ensure a fresh, green, <br /> and beautifully organized garden that enhances your home’s natural beauty.</p>

                            <Link to={'/services'} className="btn btn-primary py-3 font-semibold rounded">
                                Get Our Services
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Hero;