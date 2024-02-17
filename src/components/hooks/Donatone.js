import PropTypes from 'prop-types';
import {
  Container, ProgressBar,
} from 'react-bootstrap';

function Donatone({ goal, donated }) {
  const progress = (donated / goal) * 100;

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <span>Donaciones</span>
        <span>
          {progress}
          %
        </span>
      </div>
      <ProgressBar now={60} variant="success" className="m-1" />
      <div className="d-flex justify-content-between">
        <span>
          Donado:
          {' '}
          {donated}
          {' '}
          Bs.
        </span>
        <span>
          Meta:
          {goal}
          {' '}
          Bs.
        </span>
      </div>
    </Container>
  );
}

Donatone.propTypes = {
  goal: PropTypes.number.isRequired,
  donated: PropTypes.number.isRequired,
};

export default Donatone;
