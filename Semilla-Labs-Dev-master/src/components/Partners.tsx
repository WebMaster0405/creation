import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

const Partners: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box mb={16}>
      <Typography textAlign="center" variant="h4" mb={4}>
        Partners
      </Typography>

      <Slider {...settings}>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <a
              href="https://twitter.com/semillalabs"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/Picture1.png"
                alt="Picture1.png"
                height="120px"
                width="auto"
              />
            </a>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <a
              href="https://twitter.com/MotherbrainDAO"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/Picture2.png"
                alt="Picture2.png"
                height="120px"
                width="auto"
              />
            </a>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <a href="https://0xMonero.com" target="_blank" rel="noreferrer">
              <img
                src="/images/Picture3.png"
                alt="Picture3.png"
                height="120px"
                width="auto"
              />
            </a>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <a href="https://aurora.dev" target="_blank" rel="noreferrer">
              <img
                src="/images/Picture4.png"
                alt="Picture4.png"
                height="120px"
                width="auto"
              />
            </a>
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <a
              href="https://fantom.foundation"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/Picture5.png"
                alt="Picture5.png"
                height="120px"
                width="auto"
              />
            </a>
          </Box>
        </Box>
      </Slider>
    </Box>
  );
};

export default Partners;
