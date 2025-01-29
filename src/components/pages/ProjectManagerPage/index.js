import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Badge, Nav, NavItem, Form,
  FormGroup, FormControl, FormLabel, NavLink, Tab, Button, Modal,
} from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FaCamera, FaChartBar, FaCog, FaSignOutAlt, FaTh,
} from 'react-icons/fa';
import { BannerContent, BannerTitle } from '../../hooks/theme';
import NavBar from '../../hooks/NavBar';
import Donatone from '../../hooks/Donatone';
import Footer from '../../hooks/Footer';
import ErrorModal from '../../hooks/ErrorModal';
import InfoModal from '../../hooks/InfoModal';
import Banner from '../../layouts/Banner';
import BannerImg from '../../../img/banner-small.svg';
import api from '../../../api';
import localAPI from '../../../api/localAPI';

function ProjectManagerPage() {
  const { id, editMode } = useParams();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    is_superuser: false,
  });
  const [project, setProject] = useState({
    title: '',
    description: '',
    goal: 0,
    donated: 0,
    is_verified: false,
    created_at: '',
    updated_at: '',
    category_id: 1,
  });
  const [imageForm, setImageForm] = useState('');
  const [categories, setCategories] = useState([]);

  const [editModes] = useState({
    overview: 'ver',
    edit: 'editar',
    create: 'crear',
  });

  const [deleteShow, setDeleteShow] = useState(false);

  const [changeImagesShow, setChangeImagesShow] = useState(false);

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
  const [infoRoute, setInfoRoute] = useState('/');
  function handleCloseInfo() {
    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
    setInfoRoute('/');
    navigate(infoRoute);
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
        });
    } else {
      navigate('/login');
    }
  }

  function fetchProject() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      api.get(`/projects/${id}`)
        .then((response) => {
          setProject(response.data);
        })
        .catch(() => {
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }
  function createProject() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      api.post(`/users/${tokenData.sub}/projects/`, project)
        .then((response) => {
          setProject(response.data);

          setInfoTitle('Proyecto registrado');
          setInfoDescription('¡Proyecto creado exitosamente, gracias por confiar en nosotros!');
          setInfoRoute(`/proyectos/${response.data.id}/ver`);
          setInfoShow(true);
        })
        .catch((error) => {
          const { data, status } = error.response;

          switch (status) {
            case 401:
              setInfoTitle('Sesión expirada');
              setInfoDescription('Inicia sesión nuevamente, por favor.');
              setInfoRoute('/login');
              setInfoShow(true);
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
    } else {
      navigate('/login');
    }
  }
  function updateProject() {
    api.put(`/projects/${project.id}`, project)
      .then((response) => {
        setProject(response.data);

        setInfoTitle('Proyecto actualizado');
        setInfoDescription('El proyecto ha sido actualizado con éxito.');
        setInfoRoute(`/proyectos/${response.data.id}/ver`);
        setInfoShow(true);
      })
      .catch((error) => {
        const { data, status } = error.response;

        switch (status) {
          case 401:
            setInfoTitle('Sesión expirada');
            setInfoDescription('Inicia sesión nuevamente, por favor.');
            setInfoRoute('/login');
            setInfoShow(true);
            break;
          case 422:
            setErrorTitle('Error');
            setErrorDescription(data.detail);
            setErrorShow(true);
            break;
          default:
            setErrorShow(true);
            break;
        }
      });
  }
  function deleteProject() {
    api.delete(`/projects/${project.id}`)
      .then((response) => {
        setProject(response.data);

        setInfoTitle('Proyecto eliminado correctamente');
        setInfoDescription('El proyecto se ha eliminado con éxito.');
        setInfoRoute('/usuario');
        setInfoShow(true);
      })
      .catch((error) => {
        const { status } = error.response;

        switch (status) {
          case 401:
            setInfoTitle('Sesión expirada');
            setInfoDescription('Inicia sesión nuevamente, por favor.');
            setInfoRoute('/login');
            setInfoShow(true);
            break;
          case 403:
            setErrorTitle('Error');
            setErrorDescription('Usuario no autorizado');
            setErrorShow(true);
            break;
          default:
            setErrorShow(true);
            break;
        }
      });
  }

  function fetchCategories() {
    api.get('/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        const { status } = error.response;

        switch (status) {
          case 401:
            setInfoTitle('Sesión expirada');
            setInfoDescription('Inicia sesión nuevamente, por favor.');
            setInfoShow(true);
            break;
          default:
            setErrorShow(true);
            break;
        }
      });
  }

  function uploadImages() {
    const data = new FormData();
    data.append('file', imageForm.files[0]);

    api.post(`/images/projects/${user.id}`, data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        setChangeImagesShow(false);

        setInfoTitle('Galería actualizada');
        setInfoDescription('Las imagenes del proyecto han sido actualizadas con éxito.');
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

  function handleChange(event) {
    const projectModified = { ...project };
    if (typeof projectModified[event.target.name] === 'number') {
      projectModified[event.target.name] = Number(event.target.value);
    } else {
      projectModified[event.target.name] = event.target.value;
    }
    setProject(projectModified);
  }

  function handleToggle(event) {
    setProject({ ...project, is_verified: event.target.checked });
  }

  function handleDelete() {
    setDeleteShow(false);
    deleteProject();
  }

  function handleChangeImages(event) {
    setImageForm(event.target);
  }

  useEffect(() => {
    if (editMode === editModes.create) {
      setProject({
        title: '',
        description: '',
        goal: 0,
        donated: 0,
        created_at: '',
        updated_at: '',
        category_id: 1,
      });
    } else if (id) {
      fetchProject();
    }
  }, [editMode, id]);

  useEffect(() => {
    fetchUser();
    fetchCategories();
  }, []);

  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerContent>
          <BannerTitle>
            Proyecto
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
                    <NavLink as={Link} to={`/proyectos/${id}/ver`} className="px-2 active">
                      <FaChartBar />
                      {' '}
                      <span>Ver</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to={`/proyectos/${id}/editar`} className="px-2">
                      <FaCog />
                      {' '}
                      <span>Editar</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to={`/proyectos/${id}/crear`} className="px-2">
                      <FaTh />
                      {' '}
                      <span>Crear nuevo</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Card>

            <Card hidden={editMode === editModes.create || !editMode}>
              <Card.Body>
                <h6 className="card-title fw-bolder">Ver proyecto</h6>
                <p className="card-text">Proyecto en el portal.</p>
                <Button as={Link} to={`/proyectos-sociales/${project.id}`} className="btn-primary">Ver</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={8}>
            <Card>
              <Card.Body>
                <div className="e-profile">
                  <Row className="d-flex flex-column flex-sm-row justify-content-center mb-3">
                    <Col xs={12} md={7}>
                      <div className="text-center text-sm-left mb-2 mb-sm-0">
                        <div className="container-text-truncated">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-truncated">
                            {editMode === editModes.create || !editMode ? 'Nuevo proyecto' : project.title}
                          </h4>
                        </div>
                        <div hidden={editMode === editModes.create || !editMode} className="text-muted text-nowrap">
                          <small>
                            Creado el
                            {' '}
                            {String(project.updated_at).split('T')[0]}
                          </small>
                        </div>
                        <div hidden={editMode !== editModes.edit && editMode} className="mt-2">
                          <Button onClick={() => setChangeImagesShow(true)} className="btn-primary">
                            <FaCamera />
                            {' '}
                            Cambiar portada
                          </Button>
                        </div>
                      </div>
                      <div className="text-center text-sm-right mt-1">
                        {
                          project.is_verified
                            ? <Badge bg="success">Aprobado</Badge>
                            : <Badge bg="danger">No publicado</Badge>
                        }
                      </div>
                    </Col>
                    <Col>
                      <FormLabel htmlFor="category">Categoría</FormLabel>
                      <Form.Select
                        id="category"
                        name="category_id"
                        value={project.category_id}
                        onChange={handleChange}
                        disabled={editMode === editModes.overview}
                      >
                        {
                          categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))
                        }
                      </Form.Select>

                      <FormGroup hidden={!user.is_superuser || editMode !== editModes.edit}>
                        <FormLabel htmlFor="category" className="mt-2">Aprobado</FormLabel>
                        <Form.Switch
                          id="is-verified"
                          name="is_verified"
                          checked={project.is_verified}
                          onChange={handleToggle}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Donatone
                    donated={project.donated}
                    goal={project.goal}
                    hidden={editMode === editModes.create || !editMode}
                    className="my-4"
                  />

                  <Nav className="nav-tabs">
                    <NavItem id="overview">
                      <NavLink
                        as={Link}
                        to={`/proyectos/${id}/ver`}
                        disabled={!id}
                        className={`${editMode === editModes.overview ? 'active' : ''}`}
                      >
                        Ver
                      </NavLink>
                    </NavItem>
                    <NavItem id="edit">
                      <NavLink
                        as={Link}
                        to={`/proyectos/${id}/editar`}
                        disabled={!id}
                        className={`${(editMode === editModes.edit) ? 'active' : ''}`}
                      >
                        Editar
                      </NavLink>
                    </NavItem>
                    <NavItem id="projects">
                      <NavLink
                        as={Link}
                        to={`/proyectos/${id}/crear`}
                        disabled={!id}
                        className={`${editMode === editModes.create || !editMode ? 'active' : ''}`}
                      >
                        Crear nuevo
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Tab.Content className="tab-content pt-3">
                    <main className="tab-pane active">
                      <Form noValidate="">
                        <Row id="overview">
                          <Col>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <FormLabel htmlFor="title">Título</FormLabel>
                                  <FormControl
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Título"
                                    value={project.title}
                                    onChange={handleChange}
                                    autoComplete="on"
                                    readOnly={editMode === editModes.overview}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup className="mb-3">
                                  <FormLabel htmlFor="description">Descripción</FormLabel>
                                  <Form.Control
                                    id="description"
                                    type="text"
                                    name="description"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Descripción"
                                    value={project.description}
                                    onChange={handleChange}
                                    autoComplete="on"
                                    readOnly={editMode === editModes.overview}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row hidden={editMode !== editModes.create && editMode}>
                              <Col>
                                <FormGroup>
                                  <Form.Label>Objetivo (Bs. )</Form.Label>
                                  <Form.Range
                                    name="goal"
                                    value={project.goal / 500}
                                    onChange={(event) => {
                                      setProject({
                                        ...project,
                                        goal: Number(event.target.value) * 500,
                                      });
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={3}>
                                <Form.Control
                                  type="number"
                                  name="goal"
                                  placeholder="Meta"
                                  value={project.goal}
                                  onChange={handleChange}
                                  autoComplete="off"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row hidden={editMode !== editModes.edit}>
                          <Col className="d-flex justify-content-end">
                            <Button className="btn-danger m-2" onClick={fetchProject}>Cancelar cambios</Button>
                            <Button className="btn-primary m-2" onClick={updateProject}>Guardar cambios</Button>
                          </Col>
                        </Row>
                        <Row hidden={editMode !== editModes.create && editMode}>
                          <Col className="d-flex justify-content-end">
                            <Button className="btn-primary" onClick={createProject}>Crear proyecto</Button>
                          </Col>
                        </Row>
                      </Form>
                    </main>
                  </Tab.Content>
                </div>
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
            <Card hidden={editMode === editModes.create || !editMode}>
              <Card.Body>
                <h6 className="card-title fw-bolder text-danger">Eliminar proyecto</h6>
                <p className="card-text">Eliminar definitivamente el proyecto actual.</p>
                <Button onClick={() => setDeleteShow(true)} className="btn-danger">Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />

      <Modal
        show={deleteShow}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            Eliminar proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">¿Seguro que desea eliminar definitivamente el proyecto actual?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteShow(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Aceptar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={changeImagesShow}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            Galería del proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Imagenes del proyecto</Form.Label>
            <Form.Control name="avatar" onChange={handleChangeImages} type="file" multiple />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setChangeImagesShow(false)}>Cancelar</Button>
          <Button onClick={uploadImages}>Aceptar</Button>
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

export default ProjectManagerPage;
