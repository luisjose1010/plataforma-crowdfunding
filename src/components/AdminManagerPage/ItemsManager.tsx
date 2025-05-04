import InfoModal from '@/components/InfoModal';
import { Item } from '@/lib/types';
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

interface ItemsManagerProps {
  items: Item[];
  modalTitle: string;
  modalContent?: (id: string) => React.ReactNode;
  handleChange: (id: string) => void;
  hidden: boolean;
}

function ItemsManager({
  items, modalTitle, modalContent, handleChange, ...attrs
}: ItemsManagerProps) {
  const [id, setId] = useState<string | null>(null);
  const [infoShow, setInfoShow] = useState(false);

  function handleCancelInfo() {
    setId(null);
    setInfoShow(false);
  }

  function handleAcceptInfo() {
    if (id == null) return;

    handleChange(id);
    setId(null);
    setInfoShow(false);
  }

  function handleClick(event: React.MouseEvent<Element, MouseEvent>, itemId: string) {
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
        {
          (id != null && modalContent != null) && (
            modalContent(id)
          )
        }
      </InfoModal>
    </ListGroup>
  );
}

export default ItemsManager;
