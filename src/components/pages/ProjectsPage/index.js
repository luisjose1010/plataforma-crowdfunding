import styled from 'styled-components';
import Banner from '../../layouts/Banner/index.js';
import NavBar from '../../hooks/NavBar.js';
import BannerImg from './../../../img/banner-small.svg';


function ProjectsPage() {
  return (
    <Banner img={BannerImg}>
      <header>
        <NavBar />
      </header>

      <BannerText>
        Nuestros Proyectos
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

export default ProjectsPage;
