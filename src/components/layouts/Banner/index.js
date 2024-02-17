import styled from 'styled-components';
import PropTypes from 'prop-types';

function Banner({ img, children }) {
  return (
    <BannerContainer>
      <BannerBackground src={img} />
      <BannerContent>
        {children}
      </BannerContent>
    </BannerContainer>
  );
}

Banner.propTypes = {
  img: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const BannerContainer = styled.div`
  position: relative;
`;

const BannerContent = styled.div`
  width: 100%;
`;

const BannerBackground = styled.img`
  width: 100%;
`;

export default Banner;
