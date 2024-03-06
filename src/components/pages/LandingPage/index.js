import Banner from '../../layouts/Banner';
import { BannerSubtitle, BannerText, BannerSmall } from '../../hooks/theme';
import NavBar from '../../hooks/NavBar';
import BannerImg from '../../../img/banner.svg';

function LandingPage() {
  return (
    <Banner img={BannerImg}>
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
          Buscamos respaldar el camino hacia una mejor venezuela, promocionando a creadores de
          diferencias y proyectos en todo el país.
        </BannerSmall>
      </BannerText>
    </Banner>
  );
}

export default LandingPage;
