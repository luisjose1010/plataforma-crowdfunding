import { Modal, Button } from 'react-bootstrap/';
import PropTypes from 'prop-types';

function InfoModal({
  show, title, description, acceptHandler, cancelHandler, children,
}) {
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

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  acceptHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func,
  children: PropTypes.node,
};
InfoModal.defaultProps = {
  title: '',
  description: '',
  cancelHandler: null,
  children: null,
};

export default InfoModal;
