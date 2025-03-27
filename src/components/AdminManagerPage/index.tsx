import api from '@/api';
import localAPI from '@/api/localAPI';
import BannerImg from '@/assets/img/banner-small.svg';
import UserSearch from '@/components/AdminManagerPage//UserSearch';
import ItemsManager from '@/components/AdminManagerPage/ItemsManager';
import Donatone from '@/components/Donatone';
import ErrorModal from '@/components/ErrorModal';
import InfoModal from '@/components/InfoModal';
import Banner from '@/components/layouts/Banner';
import { Spinner } from '@/components/ui/loaders';
import { BannerContent, BannerTitle } from '@/components/ui/theme';
import { editModes, Item, Project, Transaction } from "@/types";
import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Container, Form,
  Nav, NavItem, NavLink, Row, Tab,
} from 'react-bootstrap';
import {
  FaCoins, FaSignOutAlt, FaTh, FaUser,
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

type ProjectItems = Item & Omit<Project, 'title'>;
type TransactionItems = Item & Omit<Transaction, 'payment_system' | 'reference_number'>;

type Items = {
  projects?: ProjectItems[]
  transactions?: TransactionItems[]
}

function ProjectManagerPage() {
  const { editMode = editModes.projects } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState<Items>({
    projects: undefined,
    transactions: undefined,
  });
  const itemKey = getItemKey(editModes, editMode) ?? 'projects';

  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
 
  function handleCloseError() {
    setErrorShow(false);
    setErrorTitle(null);
    setErrorDescription(null);
    navigate('/');
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
        const projectsItems = response.data.map((project: Project) => ({
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
        const transactionsItems = response.data.map((transaction: Transaction) => ({
          id: transaction.id,
          name: transaction.payment_system,
          description: transaction.reference_number,
          project: transaction.project,
          amount: transaction.amount,
          created_at: transaction.created_at,
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

  // Type guards
  function isEditModes(editMode: string): editMode is editModes {
    return Object.values(editModes).includes(editMode as editModes) !== undefined;
  }
  function isItemKey(itemKey: string): itemKey is keyof Items {
    return Object.keys(items).includes(itemKey as keyof Items)
  }

  function getItemKey(object: typeof editModes, value: string | undefined): keyof Items | undefined {
    if(value == null) return
    if(items == null) return

    const itemKey = Object.keys(object).find((key) => object[key as keyof Items] === value);
    if(itemKey == null) return
    if(!isItemKey(itemKey)) return

    return itemKey
  }

  function itemsModalContent(id: string) {
    let element = null;

    if(id == null) return
    if(!isEditModes(editMode)) return

    const itemModal: any = items[itemKey].find((item) => item.id === id)
    if(itemModal == null) return

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
                <Button as={Link as any} to={`/proyectos/${itemModal.id}/editar`}>
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
              <Button as={Link as any} to={`/proyectos-sociales/${itemModal.project.id}`} target="_blank" className="mx-2">
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
    return element;
  }

  function handleChange(id: string) {
    if(!isEditModes(editMode)) return

    api.put(`/${itemKey}/${id}`, { is_verified: true })
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

  console.log(itemKey)

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
                      <Form noValidate={true}>
                        {
                          itemKey != null ? (
                            <ItemsManager
                              items={items[itemKey] ?? []}
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
