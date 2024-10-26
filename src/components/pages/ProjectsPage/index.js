import { useParams } from 'react-router-dom';
import Banner from '../../layouts/Banner/index';
import NavBar from '../../hooks/NavBar';
import { BannerContent, BannerTitle } from '../../hooks/theme';
import BannerImg from '../../../img/banner-small.svg';
import ProjectsList from './ProjectsList';
import Footer from '../../hooks/Footer';

function ProjectsPage() {
  const { category } = useParams();

  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerContent>
          <BannerTitle>
            Nuestros Proyectos
          </BannerTitle>
        </BannerContent>
      </Banner>

      <ProjectsList categoryUrl={category} />

      <Footer />
    </>
  );
}

export default ProjectsPage;
