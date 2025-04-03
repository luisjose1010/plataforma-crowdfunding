import styled from 'styled-components';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  padding?: string;
}

function ButtonWrapper({
  className, children, ...props
}: ButtonProps) {
  return (
    <span {...props} className={className}>
      {children}
    </span>
  );
}

export const Button = styled(ButtonWrapper)`
  background-color: #219D80;
  padding: ${({ padding = '0.75rem 1.5rem' }) => padding};
  color: white
`;

export const BannerContent = styled.span`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  inset: 0;
  padding: 0 1rem;
  color: rgb(255, 255, 255);
`;

export const BannerTitle = styled.h2`
  font-family: Playfair Display;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0em;

  font-size: 1.8rem;
  line-height: 32px;

  @media (min-width: 576px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
    line-height: 40px;
  }

  @media (min-width: 992px) {
    font-size: 2.8rem;
    line-height: 64px;
  }

  @media (min-width: 1200px) {
    font-size: 3.5rem;
    line-height: 90px;
  }
`;

export const BannerSubtitle = styled.h3`
  width: 70%;

  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0em;

  font-size: 1.12rem;
  line-height: 20px;

  @media (min-width: 576px) {
    font-size: 1.16rem;
  }

  @media (min-width: 768px) {
    font-size: 1.16rem;
  }

  @media (min-width: 992px) {
    font-size: 1.20rem;
    line-height: 24px;
  }

  @media (min-width: 1200px) {
    font-size: 1.25rem;
    line-height: 28px;
  }
`;
