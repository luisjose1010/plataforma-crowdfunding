import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import searchIcon from './../../img/searchIcon.svg';


function NavBar() {
  return (
    <Navbar fixed="top" expand="lg" className="navbar-dark shadow-5-strong justify-content-between">
      <Container>
        <Navbar.Brand as={Link} to="/">Plataforma Crowdfunding</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavStyled className="mx-auto">
            <Nav.Link as={Link} to="/" className="mx-4">Inicio</Nav.Link>
            <Nav.Link as={Link} to="#sobre-nosotros" className="mx-4">Sobre nosotros</Nav.Link>
            <NavDropdown title="Proyectos sociales" id="basic-nav-dropdown" className="mx-4">
              <NavDropdown.Item as={Link} to="/proyectos-sociales">
                Todos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/proyectos-sociales/categoria-1">Categoría 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/proyectos-sociales/categoria-2">Categoría 2</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/proyectos-sociales/categoria-3">Categoría 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/proyectos-sociales/buscar">
                Buscar
              </NavDropdown.Item>
            </NavDropdown>
          </NavStyled>

          <Nav>
            <Nav.Link eventKey={1} href="#contactanos" className='text-white my-auto'>
              <ContactUsButton><b>Contáctanos</b></ContactUsButton>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#buscar" className='my-auto'>
              <SearchIcon src={searchIcon} alt="" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


const NavStyled = styled(Nav)`
  text-align: center;
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.6875rem; /* 168.75% */
`

const ContactUsButton = styled.span`
  background-color: #219D80;
  padding: 0.75rem 1.5rem;
`

const SearchIcon = styled.img`
  width: 2.7rem;
  height: 2.7rem;
`

export default NavBar;
