import Banner from '../../layouts/Banner';
import { BannerTitle, BannerSubtitle, BannerContent } from '../../hooks/theme';
import NavBar from '../../hooks/NavBar';
import Footer from '../../hooks/Footer';
import BannerImg from '../../../img/banner.svg';

function LandingPage() {
  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

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

      <Footer />
    </>
  );
}

export default LandingPage;
