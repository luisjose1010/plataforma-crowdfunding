import BannerImg from '@/assets/img/banner-small.svg';
import Banner from '@/components/layouts/Banner';
import { BannerContent, BannerTitle } from '@/components/ui/theme';
import { useParams } from 'react-router-dom';
import ProjectsList from '@/components/ProjectsPage/ProjectsList';

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
