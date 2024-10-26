import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import NavBar from '../../hooks/NavBar';
import Footer from '../../hooks/Footer';
import { BannerContent, BannerTitle } from '../../hooks/theme';
import Banner from '../../layouts/Banner';
import BannerImg from '../../../img/banner-small.svg';
import exampleCard from '../../../img/exampleCard.jpg';

function AboutUs() {
  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerContent>
          <BannerTitle>
            Sobre Nosotros
          </BannerTitle>
        </BannerContent>
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

export default AboutUs;
