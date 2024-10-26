import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Image, Button, Modal, Badge,
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BannerContent, BannerTitle } from '../../hooks/theme';
import Categories from '../../hooks/Categories';
import Donatone from '../../hooks/Donatone';
import Banner from '../../layouts/Banner/index';
import NavBar from '../../hooks/NavBar';
import ErrorModal from '../../hooks/ErrorModal';
import InfoModal from '../../hooks/InfoModal';
import BannerImg from '../../../img/banner-small.svg';
import exampleCard from '../../../img/exampleCard.jpg';
import Footer from '../../hooks/Footer';
import DonationForm from './DonationForm';
import api from '../../../api';
import localAPI from '../../../api/localAPI';

function ProjectPage() {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    id: -1,
    is_verified: true, // Avoid render danger badge
  });
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    id: null,
    is_superuser: false,
  });
  const { id } = useParams();

  const [modalShow, setModalShow] = useState(false);
  const [accountsShow, setAccountsShow] = useState(false);

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

  function fetchProject() {
    api.get(`/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch(() => {

      });
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

        });
    }
  }

  function handleError(title, description) {
    setErrorTitle(title);
    setErrorDescription(description);
    setErrorShow(true);
  }

  function handleInfo(title, description) {
    setInfoTitle(title);
    setInfoDescription(description);
    setInfoShow(true);
  }

  function handleDonateClick() {
    if (localAPI.getTokenData()) {
      setModalShow(true);
    } else {
      navigate('/login');
    }
  }

  function fetchImages() {
    api.get(`/images/projects/${project.id}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      setImage(`data:;base64,${base64}`);
    }).catch(() => {

    });
  }

  useEffect(() => {
    fetchProject();
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (project.id > 0) {
      fetchImages();
    }
  }, [project]);

  return (
    <>
      <Banner img={BannerImg}>
        <header>
          <NavBar />
        </header>

        <BannerContent>
          <BannerTitle>
            {project ? project.title : ''}
          </BannerTitle>
        </BannerContent>
      </Banner>

      <Container className="mt-5 mb-5">
        <h2>Dona a este proyecto social</h2>

        <Row className="mt-5">
          <Col sm="12" md="8">
            {
              image
                ? (<Image fluid src={image} onError={() => setImage(exampleCard)} />)
                : (<Image fluid src={exampleCard} />)
            }
            <hr />
            <Donatone goal={project.goal} donated={project.donated} />
          </Col>

          <Col sm="12" md="4">
            <Categories active={project.category_id} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm="12" md="8">
            <h3>
              {project ? project.title : ''}
              {' '}
              {!project.is_verified && (<Badge bg="danger" className="mx-2">No publicado</Badge>)}
            </h3>

            <p>{project ? project.description : ''}</p>
          </Col>
        </Row>
        <Button onClick={handleDonateClick} hidden={!project.is_verified} className="mt-2 mx-2 btn-success">
          ¡Dona a este proyecto!
        </Button>
        <Button as={Link} to={`/proyectos/${id}/editar`} hidden={!user.is_superuser && project.user_id !== user.id} className="mt-2 mx-2">
          Editar proyecto
        </Button>
      </Container>

      <Modal
        show={modalShow}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Donar al proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DonationForm
            projectId={project.id}
            acceptHandler={() => setModalShow(false)}
            infoHandler={handleInfo}
            errorHandler={handleError}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAccountsShow(true)}>Ver cuentas</Button>
          <Button onClick={() => setModalShow(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={accountsShow}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Cuentas habilitadas para recibir donaciones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Binance:</b>
            <br />
            381396218
          </p>
          <p>
            <b>Paypal:</b>
            <br />
            pagos@plataformacrowdfunding.com
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setAccountsShow(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Footer />

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

export default ProjectPage;
