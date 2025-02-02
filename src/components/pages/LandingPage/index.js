import Banner from '../../layouts/Banner';
import { BannerTitle, BannerSubtitle, BannerContent } from '../../hooks/theme';
import BannerImg from '../../../img/banner.svg';

function LandingPage() {
  return (
    <Banner img={BannerImg}>
      <BannerContent>
        <BannerSubtitle>
          Dar esperanza y apoyo, ofrecer una ayuda a la comunidad venezolana
        </BannerSubtitle>
        <BannerTitle>
          Ayudándonos Los Unos A Los Otros
          <br />
          Podemos Hacer Un Mundo Mejor
        </BannerTitle>
        <BannerSubtitle>
          Buscamos respaldar el camino hacia una mejor venezuela, promocionando a creadores de
          diferencias y proyectos en todo el país.
        </BannerSubtitle>
      </BannerContent>
    </Banner>
  );
}

export default LandingPage;
