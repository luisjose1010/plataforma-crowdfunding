import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../../img/exampleCard.jpg';

function ProjectCard({ project }) {
  return (
    <Card className="mb-2 m-2">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          {project.title}
        </Card.Title>
        <CardTextTruncated>
          <TextTruncated>
            {project.description}
          </TextTruncated>
        </CardTextTruncated>
        <Button variant="primary" as={Link} to={`/proyectos-sociales/${project.id}`}>Ir al proyecto</Button>
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const CardTextTruncated = styled(Card.Text)`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
`;

const TextTruncated = styled.span`
    font-family: Montserrat;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;

    text-overflow: ellipsis;
`;

export default ProjectCard;
