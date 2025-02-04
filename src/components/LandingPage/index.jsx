import BannerImg from '@/assets/img/banner.svg';
import Banner from '@/components/layouts/Banner';
import { BannerContent, BannerSubtitle, BannerTitle } from '@/components/ui/theme';

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
