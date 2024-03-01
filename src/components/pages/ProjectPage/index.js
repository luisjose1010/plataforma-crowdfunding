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
import api from '../../../api';

function ProjectPage() {
  const [project, setProject] = useState({});
  const { id } = useParams();

  function fetchProject() {
    api.get(`/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch(() => {

      });
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

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
