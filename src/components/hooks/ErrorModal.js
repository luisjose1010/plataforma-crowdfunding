import { Modal, Button } from 'react-bootstrap/';
import PropTypes from 'prop-types';

function ErrorModal({
  show, title, description, onHide,
}) {
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

ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

ErrorModal.defaultProps = {
  title: '',
  description: '',
};

export default ErrorModal;
