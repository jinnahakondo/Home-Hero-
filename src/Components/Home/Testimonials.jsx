import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { testimonials } from "./testimonialsData";

const TestimonialSlider = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Header */}
                <p className="uppercase text-sm text-primary mb-2 tracking-wider font-semibold">
                    Testimonials
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-12">
                    What Our Clients Say
                </h2>

                {/* Swiper */}
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    coverflowEffect={{
                        rotate: 15,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                >
                    {testimonials.map((item, i) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-base-100 border border-base-300 p-8 rounded-xl shadow-lg flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300">
                                {/* Quote */}
                                <p className="text-base-content/70 italic mb-6 text-left">
                                    “{item.quote}”
                                </p>

                                {/* User Info */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-base-content">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-base-content/60">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialSlider;
