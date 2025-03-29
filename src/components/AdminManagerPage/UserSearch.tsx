import api from '@/api';
import ErrorModal from '@/components/ErrorModal';
import InfoModal from '@/components/InfoModal';
import { User } from "@/types";
import { useState } from 'react';
import {
  Button, Container, FormControl, FormLabel,
  InputGroup,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function UserSearch({ ...attrs }) {
  const [user, setUser] = useState<User | null>(null);
  const [idCard, setIdCard] = useState<string | null>(null);

  const [errorShow, setErrorShow] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  const [infoShow, setInfoShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState<string | null>(null);
  const [infoDescription, setInfoDescription] = useState<React.ReactNode | null>(null);

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
        let description = null;

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
    if(user === null) return;
    
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

  function handleClick(event : React.MouseEvent) {
    event.preventDefault();
    fetchUser();
    setInfoTitle('Buscando usuario...');
    setInfoDescription('Por favor espere mientras se busca el usuario.');
    setInfoShow(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
