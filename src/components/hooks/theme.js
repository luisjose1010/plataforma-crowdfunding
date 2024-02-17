import styled from 'styled-components';
import PropTypes from 'prop-types';

export function Button({ children, padding }) {
  let paddingDefault = null;

  if (!padding) {
    paddingDefault = '0.75rem 1.5rem';
  }

  const SpanStyled = styled.span`
        background-color: #219D80;
        padding: ${padding || paddingDefault};
        color: white
    `;

  return (
    <SpanStyled>{children}</SpanStyled>
  );
}

Button.propTypes = {
  children: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
};
