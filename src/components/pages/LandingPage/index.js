import styled from 'styled-components';
import Banner from '../../layouts/Banner/index.js';
import NavBar from '../../hooks/NavBar.js';


function LandingPage() {
  return (
    <Banner>
      <header>
        <NavBar />
      </header>

      <BannerSubtitle>
        Dar esperanza y apoyo, ofrecer una ayuda a la comunidad venezolana
      </BannerSubtitle>
      <BannerText>
        Ayudándonos Los Unos A Los Otros
        <br />
        Podemos Hacer Un Mundo Mejor
        <br />
        <BannerSmall>
          Buscamos respaldar el camino hacia una mejor venezuela, promocionando a creadores de diferencias y proyectos en todo el país.
        </BannerSmall>
      </BannerText>
    </Banner>
  );
}


const BannerText = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

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
`

const BannerSubtitle = styled.h2`
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
`

const BannerSmall = styled.h3`
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
`

export default LandingPage;
