import { Button, Modal } from 'react-bootstrap';

interface InfoModalProps {
  show: boolean;
  title?: string | null;
  description?: string | null;
  acceptHandler: () => void;
  cancelHandler?: () => void;
  children?: React.ReactNode;
}

function InfoModal({
  show, title = '', description = '', acceptHandler, cancelHandler, children,
}: InfoModalProps) {
  return (
    <Modal
      show={show}
      onHide={cancelHandler}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          {!title ? 'Acción completada' : title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {description}
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={cancelHandler} hidden={!cancelHandler}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={acceptHandler}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
