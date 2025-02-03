import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import InfoModal from '../../hooks/InfoModal';

function ItemsManager({
  items, modalTitle, modalContent, handleChange, ...attrs
}) {
  const [id, setId] = useState(null);

  const [infoShow, setInfoShow] = useState(false);
  function handleCancelInfo() {
    setId(null);
    setInfoShow(false);
  }
  function handleAcceptInfo() {
    handleChange(id);
    setId(null);
    setInfoShow(false);
  }

  function handleClick(event, itemId) {
    event.preventDefault();
    setId(itemId);
    setInfoShow(true);
  }

  return (
    <ListGroup {...attrs}>
      {
        items
          ? items.map((item) => (
            (
              <ListGroup.Item action key={item.id} onClick={(event) => handleClick(event, item.id)} className="p-3 d-flex justify-content-between">
                <span>
                  {'ID: '}
                  <b>{item.id}</b>
                </span>
                <span>
                  {item.name}
                </span>
                <span className="text-right">{String(item.created_at).split('T')[0]}</span>
              </ListGroup.Item>
            )
          ))
          : ''
      }

      {
        items && items.length < 1
          ? (
            <span className="p-3 border rounded">
              No hay aprobaciones pendientes
            </span>
          )
          : ''
      }

      <InfoModal
        show={infoShow}
        title={modalTitle}
        acceptHandler={handleAcceptInfo}
        cancelHandler={handleCancelInfo}
      >
        {modalContent(id)}
      </InfoModal>
    </ListGroup>
  );
}

ItemsManager.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  })).isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalContent: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
};

ItemsManager.defaultProps = {
  modalContent: null,
};

export default ItemsManager;
