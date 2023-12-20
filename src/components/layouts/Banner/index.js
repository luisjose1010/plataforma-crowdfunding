import styled from 'styled-components';
import BannerImg from './../../../img/banner.svg';


function Banner({img, children}) {
  return (
    <BannerContainer>
      <BannerBackground src={img}></BannerBackground>
      <BannerContent>
        {children}
      </BannerContent>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  position: relative;
`

const BannerContent = styled.div`
  width: 100%;
`

const BannerBackground = styled.img`
  width: 100%;
`

export default Banner;
