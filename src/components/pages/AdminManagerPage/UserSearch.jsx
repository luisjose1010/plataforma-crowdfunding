import { useState } from 'react';
import {
  Container, Button, FormControl, FormLabel, InputGroup,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ErrorModal from '../../hooks/ErrorModal';
import InfoModal from '../../hooks/InfoModal';
import api from '../../../api';

function UserSearch({ ...attrs }) {
  const [user, setUser] = useState(null);
  const [idCard, setIdCard] = useState(null);

  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);

  const [infoShow, setInfoShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState(null);
  const [infoDescription, setInfoDescription] = useState(null);

  function fetchUser() {
    api.get(`/users/?id_card=${idCard}`)
      .then((response) => {
        const [userData] = response.data;

        if (!userData) {
          setInfoShow(false);

          setErrorTitle('Usuario no encontrado');
          setErrorDescription('No se ha encontrado ningún usuario con la cédula indicada.');
          setErrorShow(true);
          return;
        }
        setUser(userData);

        let title = '';
        let message = '';
        let description = '';

        if (userData.is_superuser) {
          title = 'Anular permisos de administrador';
          message = '¿Desea eliminar los permisos de administrador de este usuario?';
        } else {
          title = 'Permisos de administrador';
          message = '¿Desea otorgar permisos de administrador a este usuario?';
        }
        description = (
          <>
            {message}
            <hr />
            <p>
              <b>ID: </b>
              {userData.id}
            </p>
            <p>
              <b>Cédula: </b>
              {userData.id_card}
            </p>
            <p>
              <b>Nombre: </b>
              {userData.name}
            </p>
            <p>
              <b>Correo electrónico: </b>
              {userData.email}
            </p>
            <p>
              <b>Creado: </b>
              {userData.created_at}
            </p>
            <p>
              <b>Actualizado: </b>
              {userData.updated_at}
            </p>
            <p>
              <b>Administrador: </b>
              {userData.is_superuser ? 'Si' : 'No'}
            </p>
          </>
        );

        setInfoDescription(description);
        setInfoTitle(title);
        setInfoShow(true);
      })
      .catch(() => {

      });
  }

  function updateUser() {
    api.put(`/users/${user.id}`, { is_superuser: !user.is_superuser })
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data[0]);
        } else {
          setErrorTitle('Usuario no encontrado');
          setErrorDescription('No se ha encontrado ningún usuario con la cédula indicada.');
          setErrorShow(true);
        }
      })
      .catch(() => {

      });
  }

  function handleCloseError() {
    setErrorShow(false);
    setErrorTitle(null);
    setErrorDescription(null);
  }

  function handleAcceptInfo() {
    updateUser();

    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
  }
  function handleCancelInfo() {
    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
  }

  function handleClick(event) {
    event.preventDefault();
    fetchUser();
    setInfoTitle('Buscando usuario...');
    setInfoDescription('Por favor espere mientras se busca el usuario.');
    setInfoShow(true);
  }

  function handleChange(event) {
    setIdCard(event.target.value);
  }

  return (
    <Container {...attrs}>
      <InputGroup>
        <InputGroup.Text><FormLabel>Cédula:</FormLabel></InputGroup.Text>

        <FormControl id="search-user" type="search" onChange={handleChange} />

        <Button onClick={handleClick}>
          <FaSearch />
        </Button>
      </InputGroup>

      <ErrorModal
        show={errorShow}
        title={errorTitle}
        description={errorDescription}
        onHide={handleCloseError}
      />

      <InfoModal
        show={infoShow}
        title={infoTitle}
        acceptHandler={handleAcceptInfo}
        cancelHandler={handleCancelInfo}
      >
        {infoDescription}
      </InfoModal>
    </Container>
  );
}

export default UserSearch;
