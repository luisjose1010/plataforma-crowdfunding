import { Button, Modal } from 'react-bootstrap';

interface ErrorModalProps {
  show: boolean;
  title?: string | null;
  description?: string | null;
  onHide: () => void;
}

function ErrorModal({
  show, title = '', description = '', onHide,
}: ErrorModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          { !title ? 'Error inesperado' : title }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { !description ? 'Ha ocurrido un error inesperado.' : description }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
