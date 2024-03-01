import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import api from '../../../api';
import ProjectCard from './ProjectCard';

function ProjectsList({ categoryUrl }) {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState(null);

  function fetchProjects(categoryId) {
    let endpoint = '/projects/';

    if (categoryId) {
      endpoint += `?category_id=${categoryId}`;
    }

    api.get(endpoint)
      .then((response) => {
        setProjects(response.data);
      })
      .catch(() => {

      });
  }

  function fetchCategory() {
    api.get(`/categories/?url=${categoryUrl}`)
      .then((response) => {
        const categoryData = response.data[0];
        setCategory(categoryData);
        fetchProjects(categoryData.id);
      })
      .catch(() => {

      });
  }

  useEffect(() => {
    if (categoryUrl) {
      fetchCategory();
    } else {
      setCategory(null);
      fetchProjects();
    }
  }, [categoryUrl]);

  return (
    <Container>
      <TextSmall className="mt-5">
        <span>
          {!category ? 'Todos los proyectos' : category.name}
        </span>
      </TextSmall>

      <h2>
        ¡Encuentra Tu Proyecto Favorito
        <br />
        {' '}
        Y Apóyalo!
      </h2>

      <Row xs={2} md={4} className="g-4 mt-5">
        {
                    projects.map((project) => (
                      <Col>
                        <ProjectCard project={project} />
                      </Col>
                    ))
                }
      </Row>
    </Container>
  );
}

ProjectsList.propTypes = {
  categoryUrl: PropTypes.string.isRequired,
};

const TextSmall = styled.p`
    // Muestra la linea de al lado del texto
    span {
        font-family: Montserrat;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        position: relative;
        overflow: hidden;
    }

    span:after {
        display: inline-block;
        content: "";
        height: 1px;
        background: #00000040;
        position: absolute;
        width: 25%;
        top: 50%;
        margin-top: 1px;
        margin-left: 10px;
    }
`;

export default ProjectsList;
