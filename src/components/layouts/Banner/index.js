import styled from 'styled-components';
import BannerImg from './../../../img/banner.png';


function Banner(props) {
  return (
    <BannerContainer>
      <BannerBackground src={BannerImg}></BannerBackground>
      <BannerContent>
        {props.children}
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
