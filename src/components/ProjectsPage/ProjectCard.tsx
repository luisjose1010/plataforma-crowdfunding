import api from '@/api';
import exampleCard from '@/assets/img/exampleCard.jpg';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ProjectCard({ project }) {
  const [image, setImage] = useState(null);

  function fetchImages() {
    api.get(`/images/projects/${project.id}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      setImage(`data:;base64,${base64}`);
    }).catch(() => {

    });
  }

  useEffect(() => {
    if (project.id > 0) {
      fetchImages();
    }
  }, [project]);

  return (
    <CardStyled className="mb-2 m-2">
      {
        image
          ? (<Card.Img variant="top" src={image} onError={() => setImage(exampleCard)} />)
          : (<Card.Img variant="top" src={exampleCard} />)
      }
      <Card.Body>
        <Card.Title>
          {project.title}
        </Card.Title>
        <Card.Text className="container-text-truncated">
          <span className="text-truncated">
            {project.description}
          </span>
        </Card.Text>
        <Button variant="primary" as={Link as any} to={`/proyectos-sociales/${project.id}`}>Ir al proyecto</Button>
      </Card.Body>
    </CardStyled>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const CardStyled = styled(Card)`
  .container-text-truncated {
    .text-truncated {
      font-family: Montserrat;
      font-size: 0.875rem;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      text-overflow: ellipsis;
    }
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;

export default ProjectCard;
