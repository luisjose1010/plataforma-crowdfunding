import api from '@/api';
import localAPI from '@/api/localAPI';
import BannerImg from '@/assets/img/banner-small.svg';
import exampleCard from '@/assets/img/exampleCard.jpg';
import Donatone from '@/components/Donatone';
import ErrorModal from '@/components/ErrorModal';
import InfoModal from '@/components/InfoModal';
import Banner from '@/components/layouts/Banner';
import { ManagerLoader } from '@/components/ui/loaders';
import { BannerContent, BannerTitle } from '@/components/ui/theme';
import { useEffect, useState } from 'react';
import {
  Badge, Button, Card, Col, Container,
  Form, FormControl, FormGroup, FormLabel,
  Image, ListGroup, Modal, Nav, NavItem,
  NavLink, Row, Tab,
} from 'react-bootstrap';
import {
  FaCamera, FaChartBar, FaCog, FaSignOutAlt, FaTh,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function UserManagerPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    id_card: '',
    name: '',
    email: '',
    password: '',
    new_password: '',
    is_superuser: '',
    created_at: '',
    updated_at: '',

    projects: [],
  });
  const [avatar, setAvatar] = useState('');
  const [avatarForm, setAvatarForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editModes] = useState({
    overview: 'overview',
    edit: 'edit',
    projects: 'projects',
  });
  const [editMode, setEditMode] = useState(editModes.overview);

  const [changeAvatarShow, setChangeAvatarShow] = useState(false);

  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  function handleCloseError() {
    setErrorShow(false);
    setErrorTitle(null);
    setErrorDescription(null);
  }

  const [infoShow, setInfoShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState<string | null>(null);
  const [infoDescription, setInfoDescription] = useState<string | null>(null);
  function handleCloseInfo() {
    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
  }

  function fetchUser() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      const userId = tokenData.sub;

      api.get(`/users/${userId}/projects/`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          navigate('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/login');
    }
  }
  function updateUser() {
    api.put(`/users/${user.id}`, user)
      .then((response) => {
        setUser({ ...response.data, projects: [] }); // Evitar errores por projects vacio
        fetchUser();

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
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchAvatar() {
    api.get(`/images/users/${user.id}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      setAvatar(`data:;base64,${base64}`);
    });
  }
  function uploadAvatar() {
    const data = new FormData();
    data.append('file', avatarForm?.files[0]);

    api.post(`/images/users/${user.id}`, data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        // eslint-disable-next-line no-underscore-dangle
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        fetchAvatar();
        setChangeAvatarShow(false);

        setInfoTitle('Avatar actualizado');
        setInfoDescription('El avatar del usuario ha sido actualizado con éxito.');
        setInfoShow(true);
      }).catch((error) => {
        const { status } = error.response;
        switch (status) {
          case 403:
            setErrorTitle('Usuario no autorizado');
            setErrorDescription('El usuario no está autorizado.');
            setErrorShow(true);
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const userModified = { ...user };
    userModified[event.target.name] = event.target.value;
    setUser(userModified);
  }

  function handleChangeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    setAvatarForm(event.target);
  }

  useEffect(() => {
    fetchUser();
  }, [editMode]);

  useEffect(() => {
    if (user.id) {
      fetchAvatar();
    }
  }, [user]);

  return (
    <>
      <Banner img={BannerImg}>
        <BannerContent>
          <BannerTitle>
            Usuario
          </BannerTitle>
        </BannerContent>
      </Banner>

      <Container className="mt-4">
        <Row className="flex-lg-nowrap justify-content-center gap-3">
          <Col xs={12} lg={2}>
            <Card className="p-3 mb-3">
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
            <Card hidden={!user.is_superuser}>
              <Card.Body>
                <h6 className="card-title font-weight-bold">Administrador</h6>
                <p className="card-text">Accede al panel de administrador.</p>
                <Button onClick={() => navigate('/administrador/proyectos')}>Acceder</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={8}>
            <Card>
              <Card.Body>
                {
                  !loading ? (
                    <div className="e-profile">
                      <Row>
                        <Col className="col-12 col-sm-auto mb-3">
                          <div className="mx-auto" style={{ width: '140px' }}>
                            <div className="d-flex justify-content-center align-items-center rounded" style={{ height: '140px' }}>
                              {
                                avatar
                                  ? (
                                    <Image
                                      fluid
                                      src={avatar}
                                      alt="avatar"
                                      onError={() => setAvatar(exampleCard)}
                                      style={{ height: '140px', width: '140px' }}
                                    />
                                  )
                                  : <Image fluid src={exampleCard} alt="avatar" style={{ height: '140px', width: '140px' }} />
                              }
                            </div>
                          </div>
                        </Col>
                        <Col className="d-flex flex-column flex-sm-row justify-content-between mb-3">
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
                              <Button onClick={() => setChangeAvatarShow(true)} className="btn-primary">
                                <FaCamera />
                                {' '}
                                <span>Cambiar foto</span>
                              </Button>
                            </div>
                          </div>
                          <div className="text-center text-sm-right">
                            {
                              user.is_superuser
                                ? (<Badge as={Button} pill onClick={() => navigate('/administrador/proyectos')}>Administrador</Badge>)
                                : null
                            }
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
                          <NavLink
                            className={`${editMode === editModes.overview ? 'active' : ''}`}
                          >
                            Ver
                          </NavLink>
                        </NavItem>
                        <NavItem
                          id="edit"
                          onClick={() => setEditMode(editModes.edit)}
                        >
                          <NavLink
                            className={`${editMode === editModes.edit ? 'active' : ''}`}
                          >
                            Editar
                          </NavLink>
                        </NavItem>
                        <NavItem
                          id="projects"
                          onClick={() => setEditMode(editModes.projects)}
                        >
                          <NavLink
                            className={`${editMode === editModes.projects ? 'active' : ''}`}
                          >
                            Ver proyectos
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <Tab.Content className="tab-content pt-3">
                        <main className="tab-pane active">
                          <Form noValidate={true}>
                            <Row id="overview" hidden={editMode !== editModes.overview && editMode !== editModes.edit}>
                              <Col>
                                <Row>
                                  <Col xs="12" md="6">
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
                                  <Col xs="12" md="6">
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
                                      <FormLabel htmlFor="email2">Email</FormLabel>
                                      <FormControl
                                        id="email2"
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
                                <Button className="btn btn-danger mx-2" onClick={fetchUser}>Cancelar cambios</Button>
                                <Button className="btn btn-primary mx-2" onClick={updateUser}>Guardar cambios</Button>
                              </Col>
                            </Row>
                          </Form>

                          <Row hidden={editMode !== editModes.projects}>
                            <Col>
                              <Row>
                                <Col>
                                  <h3>Proyectos</h3>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <ListGroup>
                                    {
                                      user.projects
                                        ? user.projects.map((project) => (
                                          (
                                            <ListGroup.Item key={project.id} action as={Link} to={`/proyectos/${project.id}/ver`}>
                                              <Row className="p-2">
                                                <Col xs="12" md="6" className="my-1">
                                                  {project.title}
                                                  {' - '}
                                                  {String(project.created_at).split('T')[0]}
                                                </Col>
                                                <Col xs="12" md="6" className="my-1">
                                                  <Donatone
                                                    donated={project.donated}
                                                    goal={project.goal}
                                                    mini
                                                  />
                                                </Col>
                                              </Row>
                                            </ListGroup.Item>
                                          )
                                        ))
                                        : ''
                                    }
                                    {
                                      user.projects.length < 1
                                        ? (
                                          <ListGroup.Item action as={Link} to="/proyectos/crear" className="p-3">
                                            ¡Ups! Este usuario no tiene proyectos aún,
                                            {' '}
                                            <Link to="/proyectos/crear">¿crear uno?</Link>
                                          </ListGroup.Item>
                                        )
                                        : ''
                                    }
                                  </ListGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </main>
                      </Tab.Content>
                    </div>
                  ) : (
                    <Row>
                      <ManagerLoader />
                    </Row>
                  )
                }
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={2}>
            <Card className="mb-3">
              <Card.Body>
                <div className="px-xl-3">
                  <Button onClick={logout} className="btn-block btn-secondary">
                    <FaSignOutAlt />
                    {' '}
                    <span>Cerrar sesión</span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h6 className="card-title font-weight-bold">Crear proyecto</h6>
                <p className="card-text">Todos en algún momento necesitamos ayuda.</p>
                <Button as={Link as any} to="/proyectos/crear">Nuevo proyecto</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={changeAvatarShow}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Cambiar avatar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control name="avatar" onChange={handleChangeAvatar} type="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setChangeAvatarShow(false)}>Cancelar</Button>
          <Button onClick={uploadAvatar}>Aceptar</Button>
        </Modal.Footer>
      </Modal>

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
