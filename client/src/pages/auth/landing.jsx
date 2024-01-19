import React, { useState } from "react";
import { FirstSlide, SecondSlide, ThirdSlide } from "@components/CarouselSlide/CarouselSlide";
import Carousel from "react-bootstrap/Carousel";
import "./landing.css";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    console.log(`Set Index ${index}`);
    console.log(`Selected ${selectedIndex}`);
    if (selectedIndex === 2) {
      setIndex(2);
    } else {
      setIndex(selectedIndex);
    }
  };

  const CustomNextButton = ({ onClick }) => {
    return (
      <div
        className="carousel-control-next"
        role="button"

        onClick={onClick}
      >
        <span className="sr-only">Next</span>
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </div>
    );
  };

  return (
    <div className="main">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        nextIcon={<CustomNextButton />}
        wrap={false}
        interval={null}
      >
        <Carousel.Item>
          <FirstSlide />
        </Carousel.Item>
        <Carousel.Item>
          <SecondSlide/>
        </Carousel.Item>
        <Carousel.Item>
          <ThirdSlide/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
