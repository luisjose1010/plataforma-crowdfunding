import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Badge, Nav, NavItem, Form,
  FormGroup, FormControl, FormLabel, NavLink, Tab,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaCamera, FaChartBar, FaCog, FaSignOutAlt, FaTh,
} from 'react-icons/fa';
import { BannerText } from '../../hooks/theme';
import NavBar from '../../hooks/NavBar';
import ErrorModal from '../../hooks/ErrorModal';
import InfoModal from '../../hooks/InfoModal';
import Banner from '../../layouts/Banner';
import BannerImg from '../../../img/banner-small.svg';
import api from '../../../api';
import localAPI from '../../../api/localAPI';

function UserManagerPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    id_card: null,
    name: null,
    email: null,
    password: null,
    new_password: null,
    is_admin: null,
    created_at: null,
    updated_at: null,
  });

  const [editModes] = useState({
    overview: 'overview',
    edit: 'edit',
    projects: 'projects',
  });
  const [editMode, setEditMode] = useState(editModes.overview);

  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  function handleCloseError() {
    setErrorShow(false);
    setErrorTitle(null);
    setErrorDescription(null);
  }

  const [infoShow, setInfoShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState(null);
  const [infoDescription, setInfoDescription] = useState(null);
  function handleCloseInfo() {
    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
  }

  function fetchUser() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      const userId = tokenData.sub;

      api.get(`/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }
  function updateUser() {
    api.put(`/users/${user.id}`, user)
      .then((response) => {
        setUser(response.data);

        setInfoTitle('Usuario actualizado');
        setInfoDescription('El usuario ha sido actualizado con éxito.');
        setInfoShow(true);
      })
      .catch((error) => {
        const { data, status } = error.response;

        switch (status) {
          case 401:
            setErrorTitle('Contraseña incorrecta');
            setErrorDescription('La contraseña proporcionada para establecer una nueva es incorrecta.');
            setErrorShow(true);
            break;
          case 422:
            if (data.detail.value !== null) {
              setErrorTitle('Error');
              setErrorDescription(`El valor '${data.detail.value}' no se encuentra disponible.`);
              setErrorShow(true);
            } else {
              setErrorTitle('Error');
              setErrorDescription(data.detail);
              setErrorShow(true);
            }
            break;
          default:
            setErrorShow(true);
            break;
        }
      });
  }

  function logout() {
    localAPI.deleteToken();
    navigate('/');
  }

  function handleChange(event) {
    const userModified = { ...user };
    userModified[event.target.name] = event.target.value;
    setUser(userModified);
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
          <Col xs={12} lg="auto" className="mb-3" style={{ width: '200px' }}>
            <Card className="p-3">
              <div className="e-navlist e-navlist--active-bg">
                <Nav>
                  <NavItem>
                    <NavLink onClick={() => setEditMode(editModes.overview)} className="px-2 active">
                      <FaChartBar />
                      {' '}
                      <span>Ver</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="px-2" onClick={() => setEditMode(editModes.edit)}>
                      <FaCog />
                      {' '}
                      <span>Editar</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="px-2" onClick={() => setEditMode(editModes.projects)}>
                      <FaTh />
                      {' '}
                      <span>Proyectos</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Card>
          </Col>

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
                                <FaCamera />
                                {' '}
                                <span>Cambiar foto</span>
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
                        <NavItem
                          id="overview"
                          onClick={() => setEditMode(editModes.overview)}
                        >
                          <a
                            href="#overview"
                            className={`nav-link ${editMode === editModes.overview ? 'active' : ''}`}
                          >
                            Ver
                          </a>
                        </NavItem>
                        <NavItem
                          id="edit"
                          onClick={() => setEditMode(editModes.edit)}
                        >
                          <a
                            href="#edit"
                            className={`nav-link ${editMode === editModes.edit ? 'active' : ''}`}
                          >
                            Editar
                          </a>
                        </NavItem>
                        <NavItem
                          id="projects"
                          onClick={() => setEditMode(editModes.projects)}
                        >
                          <a
                            href="#projects"
                            className={`nav-link ${editMode === editModes.projects ? 'active' : ''}`}
                          >
                            Ver proyectos
                          </a>
                        </NavItem>
                      </Nav>
                      <Tab.Content className="tab-content pt-3">
                        <div className="tab-pane active">
                          <Form noValidate="">
                            <Row id="overview" hidden={editMode !== editModes.overview && editMode !== editModes.edit}>
                              <Col>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel htmlFor="name">Nombre</FormLabel>
                                      <FormControl
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        value={user.name}
                                        onChange={handleChange}
                                        autoComplete="on"
                                        readOnly={editMode !== editModes.edit}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel htmlFor="id-card">Cédula</FormLabel>
                                      <FormControl
                                        id="id-card"
                                        type="text"
                                        name="id_card"
                                        placeholder="Cédula"
                                        value={user.id_card}
                                        onChange={handleChange}
                                        autoComplete="on"
                                        readOnly={editMode !== editModes.edit}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-3">
                                      <FormLabel htmlFor="email">Email</FormLabel>
                                      <FormControl
                                        id="email"
                                        type="text"
                                        name="email"
                                        placeholder="example@email.com"
                                        value={user.email}
                                        onChange={handleChange}
                                        autoComplete="on"
                                        readOnly={editMode !== editModes.edit}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row id="edit" className="mt-3" hidden={editMode !== editModes.edit}>
                              <Col xs={12} sm={6} className="mb-3">
                                <div className="mb-2"><b>Cambiar contraseña</b></div>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel htmlFor="password">Contraseña actual</FormLabel>
                                      <FormControl
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="••••••"
                                        value={user.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel htmlFor="new-password">Nueva contraseña</FormLabel>
                                      <FormControl
                                        id="new-password"
                                        type="password"
                                        name="new_password"
                                        placeholder="••••••"
                                        value={user.new_password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup>
                                      <FormLabel htmlFor="confirm-password">Confirmar contraseña</FormLabel>
                                      <FormControl
                                        id="confirm-password"
                                        type="password"
                                        name="confirm_password"
                                        placeholder="••••••"
                                        autoComplete="new-password"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row hidden={editMode !== editModes.edit}>
                              <Col className="d-flex justify-content-end">
                                <button className="btn btn-primary" type="button" onClick={updateUser}>Guardar cambios</button>
                              </Col>
                            </Row>
                          </Form>

                          <Row hidden={editMode !== editModes.projects}>
                            <Col>
                              <h3>Proyectos</h3>
                            </Col>
                          </Row>
                        </div>
                      </Tab.Content>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={3} className="mb-3">
                <Card className="mb-3">
                  <Card.Body>
                    <div className="px-xl-3">
                      <button type="button" onClick={logout} className="btn btn-block btn-secondary">
                        <FaSignOutAlt />
                        {' '}
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <h6 className="card-title font-weight-bold">Crear proyecto</h6>
                    <p className="card-text">Todos en algún momento necesitamos ayuda.</p>
                    <button type="button" className="btn btn-primary">Nuevo proyecto</button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>

      <ErrorModal
        show={errorShow}
        title={errorTitle}
        description={errorDescription}
        onHide={handleCloseError}
      />

      <InfoModal
        show={infoShow}
        title={infoTitle}
        description={infoDescription}
        acceptHandler={handleCloseInfo}
      />
    </>
  );
}

export default UserManagerPage;
