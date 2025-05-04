import api from '@/api';
import localAPI from '@/api/localAPI';
import BannerImg from '@/assets/img/banner-small.svg';
import exampleCard from '@/assets/img/exampleCard.jpg';
import Categories from '@/components/Categories';
import Donatone from '@/components/Donatone';
import ErrorModal from '@/components/ErrorModal';
import InfoModal from '@/components/InfoModal';
import Banner from '@/components/layouts/Banner';
import DonationForm from '@/components/ProjectPage/DonationForm';
import { ImageLoader, ProjectLoader } from '@/components/ui/loaders';
import { BannerContent, BannerTitle } from '@/components/ui/theme';
import { Project } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  Badge, Button, Col, Container,
  Image, Modal, Row,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProjectPage() {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project>({
    id: '-1',
    title: '',
    description: '',
    goal: 0,
    donated: 0,
    is_verified: true, // Avoid render danger badge
    created_at: '',
    updated_at: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const [user, setUser] = useState({
    id: null,
    is_superuser: false,
  });
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [accountsShow, setAccountsShow] = useState(false);

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

  function fetchProject() {
    api.get(`/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch(() => {

      })
      .finally(() => {
        setLoading(false);
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

  function handleError({ title, description }: { title: string; description: string }) {
    setErrorTitle(title);
    setErrorDescription(description);
    setErrorShow(true);
  }

  function handleInfo({ title, description }: { title: string; description: string }) {
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
    if (Number(project.id) > 0) {
      fetchImages();
    }
  }, [project]);

  return (
    <>
      <Banner img={BannerImg}>
        <BannerContent>
          <BannerTitle>
            {project ? project.title : ''}
          </BannerTitle>
        </BannerContent>
      </Banner>

      <Container as="main" className="mt-5 mb-5">
        <h2>Dona a este proyecto social</h2>

        {
          !loading ? (
            <>
              <Row className="mt-5">
                <Col sm="12" md="8">
                  {
                    image
                      ? (<Image fluid src={image} onError={() => setImage(exampleCard)} />)
                      : (
                        <Row>
                          <ImageLoader />
                        </Row>
                      )
                  }
                  <hr />
                  <Donatone goal={project.goal} donated={project.donated} />
                </Col>

                <Col sm="12" md="4">
                  <Categories active={String(project.category_id)} />
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
              <Link to={`/proyectos/${id}/editar`} hidden={!user.is_superuser && project.user_id !== user.id} className="mt-2 mx-2">
                <Button>
                  Editar proyecto
                </Button>
              </Link>
            </>
          ) : (
            <Row>
              <ProjectLoader />
            </Row>
          )
        }
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
