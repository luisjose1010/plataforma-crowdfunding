import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import searchIcon from '../../img/searchIcon.svg';
import { Button } from './theme';
import api from '../../api';
import localAPI from '../../api/localAPI';
import { DotSpinner, Spinner } from './Loaders';

function NavBar() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  function fetchUser() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      const userId = tokenData.sub;

      api.get(`/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {

        })
        .finally(() => {
          setLoadingUser(false);
        });
    } else {
      setLoadingUser(false);
    }
  }

  function fetchCategory() {
    api.get('/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {

      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }

  function handleScroll() {
    const position = window.scrollY;

    if (position >= 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Styled>
      <Navbar fixed="top" expand="xl" className={`navbar-dark shadow-5-strong justify-content-between mobile-navbar ${scrolled ? 'scrolled' : ''}`}>
        <Container>
          <Navbar.Brand as={Link} to="/">Plataforma Crowdfunding</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <NavStyled className="mx-auto">
              <Nav.Link as={Link} to="/" className="mx-4">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/sobre-nosotros" className="mx-4">Sobre nosotros</Nav.Link>
              <NavDropdown title="Proyectos sociales" id="basic-nav-dropdown" className="mx-4">
                <NavDropdown.Item as={Link} to="/proyectos-sociales" className="fw-bold">
                  Todos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {
                  !loadingCategories && categories.length > 0 ? (
                    categories.map((category) => (
                      <NavDropdown.Item
                        key={category.id}
                        as={Link}
                        to={`/proyectos-sociales/categorias/${category.url}`}
                        title={category.description}
                        className="fw-bold"
                      >
                        {category.name}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <DotSpinner />
                  )
                }
                <NavDropdown.Divider hidden />
                <NavDropdown.Item as={Link} to="/proyectos-sociales/buscar" hidden className="fw-bold">
                  Buscar
                </NavDropdown.Item>
              </NavDropdown>
            </NavStyled>

            <NavStyled>
              {
                !loadingUser ? (
                  <Nav.Link eventKey={1} as={Link} to={(user ? '/usuario' : '/login')} className="py-3 text-white my-auto">
                    <Button><b>{user ? user.name : 'Iniciar Sesión'}</b></Button>
                  </Nav.Link>
                ) : (
                  <Spinner className="py-3 my-auto" />
                )
              }
              <Nav.Link eventKey={2} href="#buscar" hidden className="my-auto">
                <SearchIcon src={searchIcon} alt="" />
              </Nav.Link>
            </NavStyled>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styled>
  );
}

const Styled = styled.div`
  .scrolled {
    background-color: rgba(0, 0, 0, 0.7);
    -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;
  }

  @media (max-width: 1200px) {
    .mobile-navbar {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }

  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

  font-weight: 800;
`;

const NavStyled = styled(Nav)`
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  line-height: 1.6875rem; /* 168.75% */
`;

const SearchIcon = styled.img`
  width: 2.7rem;
  height: 2.7rem;
`;

export default NavBar;
