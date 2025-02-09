import api from '@/api';
import ProjectCard from '@/components/ProjectsPage/ProjectCard';
import { ProjectsLoader, ProjectsTitleLoader } from '@/components/ui/loaders';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ProjectsList({ categoryUrl }) {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);

  function fetchProjects(categoryId) {
    let endpoint = '/projects/?is_verified=true';

    if (categoryId) {
      endpoint += `&category_id=${categoryId}`;
    }

    api.get(endpoint)
      .then((response) => {
        setProjects(response.data);
      })
      .catch(() => {

      })
      .finally(() => {
        setLoadingProjects(false);
        setLoadingCategory(false);
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

      })
      .finally(() => {
        setLoadingCategory(false);
      });
  }

  useEffect(() => {
    setLoadingCategory(true);
    setLoadingProjects(true);

    if (categoryUrl) {
      fetchCategory();
    } else {
      setCategory(null);
      fetchProjects();
    }
  }, [categoryUrl]);

  return (
    <Container as="main">
      {
        !loadingCategory ? (
          <>
            <TextSmall className="mt-5">
              <span>
                {!category ? 'Todos los proyectos' : category.name}
              </span>
            </TextSmall>

            <h2>
              {
                !category ? '¡Encuentra Tu Proyecto Favorito!' : category.description
              }
            </h2>
          </>
        )
          : (
            <Row>
              <ProjectsTitleLoader />
            </Row>
          )
      }

      <Row className="g-4">
        {
          !loadingProjects && projects.map((project) => (
            <Col xs={12} sm={6} lg={3} key={project.id} className="mt-5">
              <ProjectCard project={project} />
            </Col>
          ))
        }

        {
          !loadingProjects && projects.length < 1
            ? (
              <Col>
                <hr />
                ¡Ups! Esta categoría no tiene proyectos aún,
                {' '}
                <Link to="/proyectos/crear">¿crear uno?</Link>
              </Col>
            )
            : ''
        }

        {
          loadingProjects && (
            <ProjectsLoader />
          )
        }
      </Row>
    </Container>
  );
}

ProjectsList.propTypes = {
  categoryUrl: PropTypes.string,
};

ProjectsList.defaultProps = {
  categoryUrl: null,
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
