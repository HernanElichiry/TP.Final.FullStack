import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from "./Card/ProductCard";
import "./Card/ProductCard.css"; // Estilos para ProductCard y el carrusel
import { CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
function ResponsiveCarousel({ courses, text = "inserte texto" }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-align">
      <div className="slider-container">
        <h2 className="Slider-description">{text}</h2>
        <Slider {...settings}>
          {courses.map((course) => (
            <ProductCard key={course.id} product={course} />
          ))}
        </Slider>
      </div>

    </div>
  );
}

export default ResponsiveCarousel;
