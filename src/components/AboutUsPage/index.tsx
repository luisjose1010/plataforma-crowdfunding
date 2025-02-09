import BannerImg from '@/assets/img/banner-small.svg';
import exampleCard from '@/assets/img/exampleCard.jpg';
import Banner from '@/components/layouts/Banner';
import {
  Col, Container, Image, Row,
} from 'react-bootstrap';
import { BannerContent, BannerTitle } from '@/components/ui/theme';

function AboutUsPage() {
  return (
    <>
      <Banner img={BannerImg}>
        <BannerContent>
          <BannerTitle>
            Sobre Nosotros
          </BannerTitle>
        </BannerContent>
      </Banner>

      <Container as="main" className="mt-5">
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
    </>
  );
}

export default AboutUsPage;
