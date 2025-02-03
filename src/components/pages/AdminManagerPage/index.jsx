import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Nav, NavItem, Form,
  NavLink, Tab, Button,
} from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FaCoins, FaSignOutAlt, FaTh, FaUser,
} from 'react-icons/fa';
import { BannerContent, BannerTitle } from '../../hooks/theme';
import ItemsManager from './ItemsManager';
import UserSearch from './UserSearch';
import Donatone from '../../hooks/Donatone';
import ErrorModal from '../../hooks/ErrorModal';
import InfoModal from '../../hooks/InfoModal';
import Banner from '../../layouts/Banner';
import BannerImg from '../../../img/banner-small.svg';
import api from '../../../api';
import localAPI from '../../../api/localAPI';
import { Spinner } from '../../hooks/Loaders';

function ProjectManagerPage() {
  const { editMode } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState({
    projects: null,
    transactions: null,
  });

  const [editModes] = useState({
    projects: 'proyectos',
    transactions: 'pagos',
    users: 'usuarios',
  });

  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorRoute, setErrorRoute] = useState(null);
  function handleCloseError() {
    setErrorShow(false);
    setErrorTitle(null);
    setErrorDescription(null);
    setErrorRoute('/');
    navigate(errorRoute);
  }

  const [infoShow, setInfoShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState(null);
  const [infoDescription, setInfoDescription] = useState(null);
  function handleCloseInfo() {
    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
  }

  function fetchProjects() {
    api.get('/projects/?is_verified=false')
      .then((response) => {
        const projectsItems = response.data.map((project) => ({
          id: project.id,
          name: project.title,
          description: project.description,
          goal: project.goal,
          donated: project.donated,
          created_at: project.created_at,
          updated_at: project.updated_at,
        }));
        setItems({ ...items, projects: projectsItems });
      })
      .catch(() => {
        setErrorShow(true);
      });
  }

  function fetchTransaction() {
    api.get('/transactions/projects/users/?is_verified=false')
      .then((response) => {
        const transactionsItems = response.data.map((transactions) => ({
          id: transactions.id,
          name: transactions.payment_system,
          description: transactions.reference_number,
          project: transactions.project,
          amount: transactions.amount,
          created_at: transactions.created_at,
        }));
        setItems({ ...items, transactions: transactionsItems });
      })
      .catch(() => {
        setErrorShow(true);
      });
  }

  function logout() {
    localAPI.deleteToken();
    navigate('/');
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function itemsModalContent(id) {
    let element = null;

    if (id) {
      const itemModal = items[getKeyByValue(editModes, editMode)].find((item) => item.id === id);

      switch (editMode) {
        case editModes.projects:
          element = (
            <>
              <p>
                <b>ID: </b>
                {itemModal.id}
              </p>
              <p>
                <b>Nombre: </b>
                {itemModal.name}
              </p>
              <p>
                <b>Descripción: </b>
                {itemModal.description}
              </p>
              <p>
                <b>Creado: </b>
                {itemModal.created_at}
              </p>
              <Row>
                <Col xs={12} md={6}>
                  <Button as={Link} to={`/proyectos/${itemModal.id}/editar`}>
                    Editar proyecto
                  </Button>
                </Col>
                <Col xs={12} md={6}>
                  <Donatone
                    mini
                    donated={itemModal.donated}
                    goal={itemModal.goal}
                    className="mt-3"
                  />
                </Col>
              </Row>
            </>
          );
          break;
        case editModes.transactions:
          element = (
            <>
              <p>
                <b>ID: </b>
                {itemModal.id}
              </p>
              <p>
                <b>Plataforma: </b>
                {itemModal.name}
              </p>
              <p>
                <b>Número de referencia: </b>
                {itemModal.description}
              </p>
              <p>
                <b>Monto: </b>
                {itemModal.amount}
                {' '}
                Bs.
              </p>
              <p>
                <b>Creado: </b>
                {itemModal.created_at}
              </p>
              <hr />
              <h3>
                {itemModal.project.title}
                {' '}
                <Button as={Link} to={`/proyectos-sociales/${itemModal.project.id}`} target="_blank" className="mx-2">
                  Ver proyecto
                </Button>
              </h3>
              <p>
                <b>Propietario: </b>
                {itemModal.project.user.name}
              </p>
              <p>
                <b>Cédula: </b>
                {itemModal.project.user.id_card}
              </p>
              <p>
                <b>Correo electrónico: </b>
                {itemModal.project.user.email}
              </p>
            </>
          );
          break;
        default:
          break;
      }
    }
    return element;
  }

  function handleChange(id) {
    const itemType = getKeyByValue(editModes, editMode);

    api.put(`/${itemType}/${id}`, { is_verified: true })
      .then(() => {
        if (editMode === editModes.projects) {
          fetchProjects();
        }
        if (editMode === editModes.transactions) {
          fetchTransaction();
        }
      })
      .catch(() => {
        setErrorShow(true);
      });
  }

  useEffect(() => {
    if (editMode === editModes.projects) {
      fetchProjects();
    }
    if (editMode === editModes.transactions) {
      fetchTransaction();
    }
  }, [editMode]);

  return (
    <>
      <Banner img={BannerImg}>
        <BannerContent>
          <BannerTitle>
            Panel de administrador
          </BannerTitle>
        </BannerContent>
      </Banner>

      <Container className="mt-4">
        <Row className="flex-lg-nowrap justify-content-center gap-3">
          <Col xs={12} lg={2}>
            <Card className="p-3">
              <div className="e-navlist e-navlist--active-bg">
                <Nav>
                  <NavItem>
                    <NavLink as={Link} to="/administrador/proyectos" className="px-2 active">
                      <FaTh />
                      {' '}
                      <span>Proyectos</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to="/administrador/pagos" className="px-2">
                      <FaCoins />
                      {' '}
                      <span>Pagos</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to="/administrador/usuarios" className="px-2">
                      <FaUser />
                      {' '}
                      <span>Usuarios</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
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
                            Gestor de
                            {' '}
                            {editMode}
                          </h4>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Nav className="nav-tabs">
                    <NavItem id="overview">
                      <NavLink
                        as={Link}
                        to="/administrador/proyectos"
                        className={`${editMode === editModes.projects ? 'active' : ''}`}
                      >
                        Proyectos
                      </NavLink>
                    </NavItem>
                    <NavItem id="edit">
                      <NavLink
                        as={Link}
                        to="/administrador/pagos"
                        className={`${editMode === editModes.transactions ? 'active' : ''}`}
                      >
                        Pagos
                      </NavLink>
                    </NavItem>
                    <NavItem id="projects">
                      <NavLink
                        as={Link}
                        to="/administrador/usuarios"
                        className={`${editMode === editModes.users ? 'active' : ''}`}
                      >
                        Usuarios
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <Tab.Content className="tab-content pt-3">
                    <main className="tab-pane active">
                      <Form noValidate="">
                        {
                          items[getKeyByValue(editModes, editMode)] ? (
                            <ItemsManager
                              items={items[getKeyByValue(editModes, editMode)]}
                              modalTitle={`Aprobar ${editMode} como administrador`}
                              modalContent={itemsModalContent}
                              hidden={editMode === editModes.users}
                              handleChange={handleChange}
                            />
                          ) : (
                            <Spinner
                              size={60}
                              stroke={10}
                              hidden={editMode === editModes.users}
                              className="p-5"
                            />
                          )
                        }

                      </Form>

                      <UserSearch
                        hidden={editMode !== editModes.users}
                      />
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
                  <button type="button" onClick={logout} className="btn btn-block btn-secondary">
                    <FaSignOutAlt />
                    {' '}
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </Card.Body>
            </Card>
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

export default ProjectManagerPage;
