import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../../img/exampleCard.jpg';

function ProjectCard({ project }) {
  return (
    <CardStyled className="mb-2 m-2">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>
          {project.title}
        </Card.Title>
        <Card.Text className="container-text-truncated">
          <span className="text-truncated">
            {project.description}
          </span>
        </Card.Text>
        <Button variant="primary" as={Link} to={`/proyectos-sociales/${project.id}`}>Ir al proyecto</Button>
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
