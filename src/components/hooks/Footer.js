import styled from 'styled-components';
import {
  Container, Row, Col, Image, Form, ButtonGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from './theme';
import exampleCard from '../../img/exampleCard.jpg';

function Footer() {
  return (
    <FooterStyled className="mt-5 p-5">
      <Container>
        <Row>
          <Col md={2}>
            <Image src={exampleCard} fluid />
          </Col>
          <Col md={2}>
            <h6>Enlaces rápidos</h6>
            <br />
            <LinkStyled as={Link} to="/"><p>Inicio</p></LinkStyled>
            <LinkStyled as={Link} to="/sobre-nosotros"><p>Sobre nosotros</p></LinkStyled>
            <LinkStyled as={Link} to="/proyectos-sociales"><p>Ver proyectos</p></LinkStyled>
            <LinkStyled as={Link} to="#galeria-de-fotos"><p>Galería de fotos</p></LinkStyled>
          </Col>
          <Col md={2}>
            <h6>En contacto</h6>
            <br />
            <LinkStyled as={Link} to="#contactanos"><p>Contáctanos</p></LinkStyled>
            <LinkStyled as={Link} to="#nuestros-servicios"><p>Nuestros servicios</p></LinkStyled>
          </Col>
          <Col md={2}>
            <h6>Dirección</h6>
            <br />
            <LinkStyled to="https://maps.app.goo.gl/jicM56gbqrofDRpF6" target="_blank">
              <p>Prolongación Circunvalación 2 con Avenida 16, Maracaibo 4005, Zulia</p>
            </LinkStyled>
          </Col>
          <Col md={4}>
            <h6>Newsletter</h6>
            <br />
            <Form>
              <ButtonGroup>
                <SearchControlStyled id="email-footer" type="email" name="email" placeholder="Ingresa tu Email" autoComplete="on" />
                <Button padding="0.75rem 1.25rem">Suscribirse</Button>
              </ButtonGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
    background-color: #454545;
    color: #AFAFAF;

    h6 {
        color: white
    }

    p {
        color: #AFAFAF;
        font-size: 1rem;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

const SearchControlStyled = styled(Form.Control)`
    width: 100%;
    padding: 0.5rem 2rem;
    border-radius: 0;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    margin: 0;
    padding: 0;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default Footer;
