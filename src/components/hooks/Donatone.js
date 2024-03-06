import PropTypes from 'prop-types';
import {
  Container, ProgressBar,
} from 'react-bootstrap';

function Donatone({ goal, donated }) {
  const progress = (donated / goal) * 100;

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <h4>Donaciones</h4>
        <span>
          {progress}
          %
        </span>
      </div>
      <ProgressBar now={progress} variant="success" className="m-1" />
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
          {' '}
          {goal}
          {' '}
          Bs.
        </span>
      </div>
    </Container>
  );
}

Donatone.propTypes = {
  goal: PropTypes.number,
  donated: PropTypes.number,
};

Donatone.defaultProps = {
  goal: 0,
  donated: 0,
};

export default Donatone;
