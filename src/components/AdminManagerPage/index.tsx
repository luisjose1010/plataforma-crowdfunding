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
import { findKeyByValue, isValueOf } from '@/lib/utils';
import { editModes, Item, Project, Transaction } from '@/lib/types';
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
  projects?: ProjectItems[];
  transactions?: TransactionItems[];
};

function AdminManagerPage() {
  const { editMode = editModes.projects } = useParams();

  const navigate = useNavigate();
  const [items, setItems] = useState<Items>({
    projects: undefined,
    transactions: undefined,
  });
  const itemKey = findKeyByValue(editModes, editMode, items) ?? 'projects';

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
      .then(({ data }: { data: Project[] }) => {
        const projects: ProjectItems[] = data?.map(
          (project) => ({
            id: project.id,
            name: project.title,
            description: project.description,
            goal: project.goal,
            donated: project.donated,
            is_verified: project.is_verified,
            created_at: project.created_at,
            updated_at: project.updated_at,
          }),
        );
        setItems({ ...items, projects });
      })
      .catch(() => {
        setErrorShow(true);
      });
  }

  function fetchTransactions() {
    api.get('/transactions/projects/users/?is_verified=false')
      .then(({ data }: { data: Transaction[] }) => {
        const transactions: TransactionItems[] = data?.map(
          (transaction) => ({
            id: transaction.id,
            name: transaction.payment_system,
            description: transaction.reference_number,
            project: transaction.project,
            amount: transaction.amount,
            created_at: transaction.created_at,
            updated_at: transaction.updated_at,
          }),
        );
        setItems({ ...items, transactions });
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
  function isProjectItems(item: Item): item is ProjectItems {
    return 'goal' in item;
  }
  function isTransactionItems(item: Item): item is TransactionItems {
    return 'amount' in item;
  }

  function itemsModalContent(id: string) {
    let element = null;

    if (id == null) return;
    if (!isValueOf(editModes, editMode)) return;

    const itemModal = items[itemKey]?.find((item) => item.id === id);
    if (itemModal == null) return;

    switch (editMode) {
      case editModes.projects:
        if (!isProjectItems(itemModal)) return;

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
                <Link to={`/proyectos/${itemModal.id}/editar`}>
                  <Button>
                    Editar proyecto
                  </Button>
                </Link>
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
        if (!isTransactionItems(itemModal)) return;

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
              {itemModal?.project?.title}
              {' '}
              <Link to={`/proyectos-sociales/${itemModal?.project?.id}`} target="_blank" className="mx-2">
                <Button>
                  Ver proyecto
                </Button>
              </Link>
            </h3>
            <p>
              <b>Propietario: </b>
              {itemModal?.project?.user?.name}
            </p>
            <p>
              <b>Cédula: </b>
              {itemModal?.project?.user?.id_card}
            </p>
            <p>
              <b>Correo electrónico: </b>
              {itemModal?.project?.user?.email}
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
    if (!isValueOf(editModes, editMode)) return;

    api.put(`/${itemKey}/${id}`, { is_verified: true })
      .then(() => {
        if (editMode === editModes.projects) {
          fetchProjects();
        }
        if (editMode === editModes.transactions) {
          fetchTransactions();
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
      fetchTransactions();
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

export default AdminManagerPage;
