import PropTypes from 'prop-types';
import React from "react";
import styled from 'styled-components';

interface BannerProps {
  img: string
  children: React.ReactNode
}

function Banner({ img, children }: BannerProps) {
  return (
    <BannerContainer>
      <BannerBackground src={img} />
      {children}
    </BannerContainer>
  );
}

Banner.propTypes = {
  img: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const BannerContainer = styled.div`
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    margin-top: 56px; /* Navbar height */
  }
`;

const BannerBackground = styled.img`
  background-size: cover;
  background-position: 50% 50%;

  @media (max-width: 575.8px) {
    max-height: 70vh;
  }

  @media (min-width: 576px) {
    width: 100%;
  }
`;

export default Banner;
