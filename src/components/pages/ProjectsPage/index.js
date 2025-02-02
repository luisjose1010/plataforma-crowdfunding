import { useParams } from 'react-router-dom';
import Banner from '../../layouts/Banner/index';
import { BannerContent, BannerTitle } from '../../hooks/theme';
import BannerImg from '../../../img/banner-small.svg';
import ProjectsList from './ProjectsList';

function ProjectsPage() {
  const { category } = useParams();

  return (
    <>
      <Banner img={BannerImg}>
        <BannerContent>
          <BannerTitle>
            Nuestros Proyectos
          </BannerTitle>
        </BannerContent>
      </Banner>

      <ProjectsList categoryUrl={category} />
    </>
  );
}

export default ProjectsPage;
