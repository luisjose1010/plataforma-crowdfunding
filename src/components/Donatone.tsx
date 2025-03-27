import PropTypes from 'prop-types';
import {
  Container, ProgressBar,
} from 'react-bootstrap';
import styled from 'styled-components';

interface DonatoneProps {
  goal: number;
  donated: number;
  mini?: boolean;
  className?: string;
  hidden?: boolean;
}

function Donatone({
  goal, donated, mini = false, className = '', ...attrs
}: DonatoneProps) {
  let progress: any = 100;

  if (goal > 0) {
    progress = (donated / goal) * 100;
  }

  if (progress > 100) {
    progress = 100;
  }

  progress = (Math.round(progress * 100) / 100).toFixed(2);

  return (
    <ContainerStyled className={className} {...attrs}>
      <div className={`d-flex justify-content-between ${mini ? 'mini' : null}`}>
        <h4>Donaciones</h4>
        <span>
          {progress}
          %
        </span>
      </div>
      <ProgressBar now={progress} variant="success" className="m-1" />
      <div className={`d-flex justify-content-between ${mini ? 'mini' : null}`}>
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
    </ContainerStyled>
  );
}

Donatone.propTypes = {
  goal: PropTypes.number,
  donated: PropTypes.number,
  mini: PropTypes.bool,
  className: PropTypes.string,
};

Donatone.defaultProps = {
  goal: 0,
  donated: 0,
  mini: false,
  className: '',
};

const ContainerStyled = styled(Container)`
  .mini {
    h4 {
      font-size: 1rem;
    }

    span {
      font-size: 0.9rem;
    }
  }
`;

export default Donatone;
