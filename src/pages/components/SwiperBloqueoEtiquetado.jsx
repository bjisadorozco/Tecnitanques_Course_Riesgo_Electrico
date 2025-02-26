import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/SwiperComponent.css";

const SwiperComponent = ({ slides }) => {
  return (
    <div className="border h-full m-0 ">
      <Swiper
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}">${index + 1}</span>`; // Esto muestra los números
          },
        }}
        modules={[Pagination, Navigation]}
        navigation={true}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-container "
              style={{ backgroundImage: `url(${slide.imgSrc})` }}
            >
              <div className="text-overlay px-8 md:px-auto">
                <h1 className="text-white font-bold mb-0 md:mb-12 text-xl md:text-title-size">
                  {slide.title}
                </h1>
                <p className="text-white p-0 mt-2">{slide.text}</p>
                <div className="text-center mt-2 md:mt-12 mx-0 md:mx-auto flex justify-center">
                  <audio controls className="media-espanol audio-inicio">
                    <source src={slide.audioEsp} type="audio/mp3" />
                  </audio>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
