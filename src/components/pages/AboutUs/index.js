import styled from 'styled-components';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import Banner from '../../layouts/Banner/index';
import NavBar from '../../hooks/NavBar';
import BannerImg from '../../../img/banner-small.svg';
import exampleCard from '../../../img/exampleCard.jpg';
import Footer from '../../hooks/Footer';

function AboutUs() {
  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerText>
          Sobre Nosotros
        </BannerText>
      </Banner>

      <Container className="mt-5">
        <Row>
          <Col>
            <Image src={exampleCard} />
          </Col>

          <Col>
            <h2>Tu apoyo es sumamente poderoso</h2>

            El secreto de la felicidad está en ayudar a los demás. Nunca
            subestimes la diferencia que TÚ puedes hacer en el
            vidas de los pobres, los maltratados y los indefensos.
            Todos podemos necesitar ayuda en algún momento, eres importante.
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

const BannerText = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

  color: rgb(255, 255, 255);
  padding: 0 1rem;
  position: absolute;

  font-family: Playfair Display;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 90px;
  letter-spacing: 0em;
  text-align: center;
  top: 35%;
  width: 70%;
  left: 15%;
`;

export default AboutUs;
