import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    speed: 500,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-[500px]"
            src="public/428677936_1126958921779015_5608143288186371162_n.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-[500px]"
            src="public/fbu-1-thang7-1.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full h-[500px]"
            src="public/fbu-2-thang7-2.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
