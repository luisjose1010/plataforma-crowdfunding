import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Badge, Nav, NavItem, Form, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../../layouts/Banner/index';
import NavBar from '../../hooks/NavBar';
import BannerImg from '../../../img/banner-small.svg';
import api from '../../../api';
import localAPI from '../../../api/localAPI';

function UserManagerPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    id_card: '',
    name: '',
    email: '',
    is_admin: '',
    created_at: '',
    updared_at: '',
  });

  function fetchUser() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      const userId = tokenData.sub;

      api.get(`/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {

        });
    }
  }

  function logout() {
    localAPI.deleteToken();
    navigate('/');
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerText>
          Usuario
        </BannerText>
      </Banner>

      <Container className="mt-4">
        <Row className="flex-lg-nowrap">
          <div className="col-12 col-lg-auto mb-3" style={{ width: '200px' }}>
            <div className="card p-3">
              <div className="e-navlist e-navlist--active-bg">
                <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link px-2 active" href="#a">
                      <i className="fa fa-fw fa-bar-chart mr-1" />
                      <span>Overview</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-2" href="https://www.bootdey.com/snippets/view/bs4-crud-users" target="__blank">
                      <i className="fa fa-fw fa-th mr-1" />
                      <span>CRUD</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-2" href="https://www.bootdey.com/snippets/view/bs4-edit-profile-page" target="__blank">
                      <i className="fa fa-fw fa-cog mr-1" />
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Col>
            <Row>
              <Col className="mb-3">
                <Card>
                  <Card.Body>
                    <div className="e-profile">
                      <Row>
                        <Col className="col-12 col-sm-auto mb-3">
                          <div className="mx-auto" style={{ width: '140px' }}>
                            <div className="d-flex justify-content-center align-items-center rounded" style={{ height: '140px', backgroundColor: 'rgb(233, 236, 239)' }}>
                              <span style={{ color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial' }}>140x140</span>
                            </div>
                          </div>
                        </Col>
                        <Col className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{user.name}</h4>
                            <p className="mb-0">{user.email}</p>
                            <div className="text-muted">
                              <small>
                                Modificado el
                                {' '}
                                {String(user.updated_at).split('T')[0]}
                              </small>
                            </div>
                            <div className="mt-2">
                              <button className="btn btn-primary" type="button">
                                <i className="fa fa-fw fa-camera" />
                                <span>Change Photo</span>
                              </button>
                            </div>
                          </div>
                          <div className="text-center text-sm-right">
                            { Boolean(user.is_superuser) === true ? (<Badge bg="secondary">administrator</Badge>) : null}
                            <div className="text-muted">
                              <small>
                                Unido el
                                {' '}
                                {String(user.created_at).split('T')[0]}
                              </small>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Nav className="nav-tabs">
                        <NavItem className="nav-item"><a href="#a" className="active nav-link">Settings</a></NavItem>
                      </Nav>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <Form noValidate="">
                            <Row>
                              <Col>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel>Nombre</FormLabel>
                                      <FormControl type="text" name="name" placeholder="Nombre" value={user.name} />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel>Cédula</FormLabel>
                                      <FormControl type="text" name="id_card" placeholder="Cédula" value={user.id_card} />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-3">
                                      <FormLabel>Email</FormLabel>
                                      <FormControl type="text" placeholder="example@email.com" value={user.email} />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row className="mt-3">
                              <Col xs={12} sm={6} className="mb-3">
                                <div className="mb-2"><b>Cambiar contraseña</b></div>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel>Contraseña actual</FormLabel>
                                      <FormControl type="password" placeholder="••••••" />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel>Nueva contraseña</FormLabel>
                                      <FormControl type="password" placeholder="••••••" />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel>
                                        Confirmar contraseña
                                      </FormLabel>
                                      <FormControl type="password" placeholder="••••••" />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit">Save Changes</button>
                              </Col>
                            </Row>
                          </Form>

                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={3} className="mb-3">
                <Card className="mb-3">
                  <Card.Body>
                    <div className="px-xl-3">
                      <button type="button" onClick={logout} className="btn btn-block btn-secondary">
                        <i className="fa fa-sign-out" />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <h6 className="card-title font-weight-bold">Support</h6>
                    <p className="card-text">Get fast, free help from our friendly assistants.</p>
                    <button type="button" className="btn btn-primary">Contact Us</button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </>
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
`;

export default UserManagerPage;
