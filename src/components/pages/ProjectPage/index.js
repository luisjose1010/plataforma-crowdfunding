import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Categories from '../../hooks/Categories';
import Donatone from '../../hooks/Donatone';
import Banner from '../../layouts/Banner/index';
import NavBar from '../../hooks/NavBar';
import BannerImg from '../../../img/banner-small.svg';
import exampleCard from '../../../img/exampleCard.jpg';
import Footer from '../../hooks/Footer';

function ProjectPage() {
  // Datos hardcode de prueba
  const [projectsData] = useState([
    {
      id: 1,
      title: 'Beneficio a favor de Maria Laura Rosales',
      description: 'Maria Laura tiene una enfermedad y necesita dinero para poder vivir un día más, ayudanos.',
      process: '50%',
      donated: 2000,
      goal: 4000,
      categoryId: 0,
    },
    {
      id: 2,
      title: 'Ayuda a la comunidad Sagrada Familia',
      description: 'La comunidad está pasando por un momento de necesidad en el cuál se les imposibilita el acceso a agua limpia y necesitamos tu valiosa ayuda.',
      process: '72.5%',
      donated: 1450,
      goal: 2000,
      categoryId: 1,
    },
    {
      id: 3,
      title: 'Actividad en favor de los niños de bajo recursos',
      description: 'Ayudanos a ofrecerles un momento de felicidad a estos niños que día a día sufren de la precariedad y el abandono, para poder dar un paso más en poner una pequeña sonrisa en sus rostros.',
      process: '60%',
      donated: 3000,
      goal: 5000,
      categoryId: 2,
    },
  ]);

  const [project, setProject] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setProject(projectsData.find((item) => item.id === parseInt(id, 10)));
  }, []);

  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerText>
          {project ? project.title : ''}
        </BannerText>
      </Banner>

      <Container className="mt-5 mb-5">
        <h2>Dona a este proyecto social</h2>

        <Row className="mt-5">
          <Col sm="12" md="8">
            <Image src={exampleCard} />
            <hr />
            <Donatone goal={project.goal} donated={project.donated} />
          </Col>

          <Col sm="12" md="4">
            <Categories />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm="12" md="8">
            <h3>{project ? project.title : ''}</h3>

            <p>{project ? project.description : ''}</p>
          </Col>

          <Col sm="12" md="4" />
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

export default ProjectPage;
