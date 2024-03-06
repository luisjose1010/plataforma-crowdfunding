import styled from 'styled-components';
import PropTypes from 'prop-types';

function ButtonWrapper({
  className, children, ...props
}) {
  return (
    <span {...props} className={className}>
      {children}
    </span>
  );
}
ButtonWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
  padding: PropTypes.string,
};
ButtonWrapper.defaultProps = {
  padding: null,
  children: null,
};

export const Button = styled(ButtonWrapper)`
  background-color: #219D80;
  padding: ${(props) => props.padding || '0.75rem 1.5rem'};
  color: white
`;

export const BannerText = styled.span`
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

export const BannerSubtitle = styled.h2`
  color: rgb(255, 255, 255);
  padding: 0 1rem;
  justify-self: center;
  position: absolute;

  font-family: Montserrat;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;

  top: 30%;
  width: 70%;
  left: 15%;
`;

export const BannerSmall = styled.h3`
  color: rgb(255, 255, 255);
  position: relative;
  width: 70%;

  font-family: Montserrat;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;
  left: 15%;
`;
