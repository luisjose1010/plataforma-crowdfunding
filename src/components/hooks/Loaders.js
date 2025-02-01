import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

export function ImageLoader(props) {
  return (
    <ContentLoader viewBox="0 40 1000 350" height={250} width={800} {...props}>
      <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
    </ContentLoader>
  );
}

export function ProjectLoader(props) {
  return (
    <ContentLoader viewBox="150 50 800 600" height={600} width={500} {...props}>
      <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
      <rect x="0" y="340" width="700" height="45" rx="3.83" />
      <rect x="0" y="410" width="400" height="30" rx="4.5" />
      <rect x="0" y="460" width="700" height="100" rx="3.83" />
      <rect x="0" y="580" width="200" height="30" rx="4.5" />
    </ContentLoader>
  );
}

export function ProjectsLoader(props) {
  return (
    <ContentLoader speed={1} viewBox="0 0 1360 900" width={1360} {...props}>
      <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="910" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="910" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="1130" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="1130" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="30" y="340" rx="8" ry="8" width="200" height="200" />
      <rect x="30" y="570" rx="0" ry="0" width="200" height="18" />
      <rect x="30" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="250" y="340" rx="8" ry="8" width="200" height="200" />
      <rect x="250" y="570" rx="0" ry="0" width="200" height="18" />
      <rect x="250" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="470" y="340" rx="8" ry="8" width="200" height="200" />
      <rect x="470" y="570" rx="0" ry="0" width="200" height="18" />
      <rect x="470" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="690" y="340" rx="8" ry="8" width="200" height="200" />
      <rect x="690" y="570" rx="0" ry="0" width="200" height="18" />
      <rect x="690" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="910" y="340" rx="8" ry="8" width="200" height="200" />
      <rect x="910" y="570" rx="0" ry="0" width="200" height="18" />
      <rect x="910" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="1130" y="340" rx="8" ry="8" width="200" height="200" />
      <rect x="1130" y="570" rx="0" ry="0" width="200" height="18" />
      <rect x="1130" y="595" rx="0" ry="0" width="120" height="20" />
    </ContentLoader>
  );
}

export function ProjectsTitleLoader(props) {
  return (
    <ContentLoader
      speed={1}
      width={1360}
      height={150}
      viewBox="0 0 1360 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="15" y="50" rx="3" ry="3" width="273" height="17" />
      <rect x="15" y="90" rx="3" ry="3" width="700" height="40" />
    </ContentLoader>
  );
}

export function ManagerLoader(props) {
  return (
    <ContentLoader speed={1} viewBox="0 0 400 200" width={400} {...props}>
      <circle cx="45" cy="45" r="40" />
      <rect x="90" y="10" rx="3" ry="3" width="120" height="15" />
      <rect x="110" y="30" rx="3" ry="3" width="80" height="10" />
      <rect x="110" y="45" rx="3" ry="3" width="80" height="10" />
      <rect x="115" y="60" rx="3" ry="3" width="70" height="20" />
      <rect x="15" y="120" rx="3" ry="3" width="180" height="25" />
      <rect x="210" y="120" rx="3" ry="3" width="180" height="25" />
      <rect x="15" y="160" rx="3" ry="3" width="375" height="25" />
      <rect x="330" y="10" rx="3" ry="3" width="60" height="10" />
    </ContentLoader>
  );
}

export function CategoriesLoader(props) {
  return (
    <ContentLoader speed={1} viewBox="0 0 300 300" width={800} {...props}>
      <rect x="0" y="10" rx="3" ry="3" width="300" height="25" />
      <rect x="0" y="45" rx="3" ry="3" width="300" height="25" />
      <rect x="0" y="80" rx="3" ry="3" width="300" height="25" />
      <rect x="0" y="115" rx="3" ry="3" width="300" height="25" />
      <rect x="0" y="150" rx="3" ry="3" width="300" height="25" />
      <rect x="0" y="185" rx="3" ry="3" width="300" height="25" />
    </ContentLoader>
  );
}

function SpinnerWrapper(props) {
  return (
    <div {...props}>
      <div className="container" />
    </div>
  );
}

SpinnerWrapper.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.number,
  stroke: PropTypes.number,
};

SpinnerWrapper.defaultProps = {
  size: null,
  color: null,
  speed: null,
  stroke: null,
};

export const Spinner = styled(SpinnerWrapper)`
  .container {
    --uib-size: ${({ size }) => size ?? '30'}px;
    --uib-color: ${({ color }) => color ?? '#219D80'};
    --uib-speed: ${({ speed }) => speed ?? '.9'}s;
    --uib-stroke: ${({ stroke }) => stroke ?? '6'}px;
    --mask-size: calc(var(--uib-size) / 2 - var(--uib-stroke));
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
    -webkit-mask: radial-gradient(
      circle var(--mask-size),
      transparent 99%,
      #000 100%
    );
    mask: radial-gradient(circle var(--mask-size), transparent 99%, #000 100%);
    background-image: conic-gradient(transparent 25%, var(--uib-color));
    animation: spin calc(var(--uib-speed)) linear infinite;
    border-radius: 50%;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function DotSpinnerWrapper(props) {
  return (
    <div {...props}>
      <div className="container">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
}

DotSpinnerWrapper.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.number,
  stroke: PropTypes.number,
};

DotSpinnerWrapper.defaultProps = {
  size: null,
  color: null,
  speed: null,
  stroke: null,
};

export const DotSpinner = styled(DotSpinnerWrapper)`
  .container {
    --uib-size: ${({ size }) => size ?? '30'}px;
    --uib-color: ${({ color }) => color ?? '#219D80'};
    --uib-speed: ${({ speed }) => speed ?? '.9'}s;
    --uib-stroke: ${({ stroke }) => stroke ?? '6'}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
  }

  .dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  .dot::before {
    content: '';
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    transition: background-color 0.3s ease;
  }

  .dot:nth-child(2) {
    transform: rotate(45deg);
  }

  .dot:nth-child(2)::before {
    animation-delay: calc(var(--uib-speed) * -0.875);
  }

  .dot:nth-child(3) {
    transform: rotate(90deg);
  }

  .dot:nth-child(3)::before {
    animation-delay: calc(var(--uib-speed) * -0.75);
  }

  .dot:nth-child(4) {
    transform: rotate(135deg);
  }

  .dot:nth-child(4)::before {
    animation-delay: calc(var(--uib-speed) * -0.625);
  }

  .dot:nth-child(5) {
    transform: rotate(180deg);
  }

  .dot:nth-child(5)::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
  }

  .dot:nth-child(6) {
    transform: rotate(225deg);
  }

  .dot:nth-child(6)::before {
    animation-delay: calc(var(--uib-speed) * -0.375);
  }

  .dot:nth-child(7) {
    transform: rotate(270deg);
  }

  .dot:nth-child(7)::before {
    animation-delay: calc(var(--uib-speed) * -0.25);
  }

  .dot:nth-child(8) {
    transform: rotate(315deg);
  }

  .dot:nth-child(8)::before {
    animation-delay: calc(var(--uib-speed) * -0.125);
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
