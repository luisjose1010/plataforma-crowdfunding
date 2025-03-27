import api from '@/api';
import localAPI from '@/api/localAPI';
import ErrorModal from '@/components/ErrorModal';
import InfoModal from '@/components/InfoModal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';
import { FiAtSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    id_card: '',
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [loginErrors, setLoginErrors] = useState([
    'email',
    'password',
  ]);
  const [registerErrors, setRegisterErrors] = useState([
    'id_card',
    'name',
    'email',
    'password',
  ]);

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

  function goHome() {
    navigate('/');
  }

  function fetchToken(username, password) {
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    api.post('/token', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        localAPI.setToken(response.data.access_token);
        goHome();
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            setErrorTitle('Datos incorrectos');
            setErrorDescription('Usuario o contraseña son incorrectos.');
            setErrorShow(true);
            break;
          default:
            setErrorShow(true);
            break;
        }
      });
  }

  function login() {
    fetchToken(loginData.email, loginData.password);
  }

  function registerUser() {
    api.post('/users/', userData)
      .then(() => {
        setInfoTitle('Usuario registrado');
        setInfoDescription('¡Usuario registrado correctamente, gracias por unirte!');
        setInfoShow(true);
      })
      .catch((error) => {
        const { data, status } = error.response;

        switch (status) {
          case 422:
            if (data.detail.value !== null) {
              setErrorTitle('Error');
              setErrorDescription(`El valor '${data.detail.value}' no se encuentra disponible.`);
              setErrorShow(true);
            } else {
              setErrorTitle('Error');
              setErrorDescription(data.detail);
              setErrorShow(true);
            }
            break;
          default:
            setErrorShow(true);
            break;
        }
      });
  }

  function validateField(event, errors) {
    let errorsModified = [...errors];

    if (!event.target.validity.valid) {
      if (errors.indexOf(event.target.name) < 0) {
        errorsModified.push(event.target.name);
      }
    } else {
      errorsModified = errorsModified.filter((item) => item !== event.target.name);
    }
    return errorsModified;
  }

  function handleCloseInfo() {
    setInfoShow(false);
    setInfoTitle(null);
    setInfoDescription(null);
    fetchToken(userData.email, userData.password);
  }

  function handleChangeLogin(event) {
    const loginDataModified = { ...loginData };
    loginDataModified[event.target.name] = event.target.value;
    setLoginData(loginDataModified);
    setLoginErrors(validateField(event, loginErrors));
  }

  function handleChangeRegister(event) {
    const userDataModified = { ...userData };
    userDataModified[event.target.name] = event.target.value;
    setUserData(userDataModified);
    setRegisterErrors(validateField(event, registerErrors));
  }

  return (
    <ContainerStyled>
      <Row className="full-height flex-column align-items-center justify-content-center mt-4">
        <Col md={2} className="text-center">
          <button type="button" onClick={goHome} className="btn button-back">
            <h6>
              Regresar
            </h6>
          </button>
        </Col>
        <Col md={10} className="text-center py-5">
          <div className="section pb-5 pt-5 pt-sm-2">
            <h6 className="mb-0 pb-2 text-center">
              <span>Iniciar sesión</span>
              <span>Registrarse</span>
            </h6>
            <input className="checkbox control-form" type="checkbox" id="reg-log" name="reg-log" />
            <label htmlFor="reg-log" />
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                    <div className="section text-center">
                      <h4 className="mb-3 pb-3">Iniciar sesión</h4>
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          onChange={handleChangeLogin}
                          className="form-style"
                          placeholder="Correo electrónico"
                          id="email-login"
                          autoComplete="on"
                          required
                        />
                        <FiAtSign className="input-icon" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChangeLogin}
                          className="form-style"
                          placeholder="Contraseña"
                          id="logpass"
                          autoComplete="on"
                          required
                        />
                        <FaLock className="input-icon" />
                      </div>
                      <button type="submit" className="btn mt-4" onClick={login} disabled={loginErrors.length > 0}>
                        Ingresar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-back">
                  <div className="center-wrap">
                    <div className="section text-center">
                      <h4 className="mb-3 pb-3">Registrarse</h4>
                      <div className="form-group">
                        <input
                          type="text"
                          name="id_card"
                          onChange={handleChangeRegister}
                          className="form-style"
                          placeholder="Cédula"
                          id="id-card"
                          autoComplete="on"
                          required
                        />
                        <i className="input-icon uil uil-user" />
                        <FaUser className="input-icon" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="text"
                          name="name"
                          onChange={handleChangeRegister}
                          className="form-style"
                          placeholder="Nombre y apellido"
                          id="username"
                          autoComplete="on"
                          required
                        />
                        <i className="input-icon uil uil-user" />
                        <FaUser className="input-icon" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="email"
                          name="email"
                          onChange={handleChangeRegister}
                          className="form-style"
                          placeholder="Correo electrónico"
                          id="email-register"
                          autoComplete="on"
                          required
                        />
                        <FiAtSign className="input-icon" />
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChangeRegister}
                          className="form-style"
                          placeholder="Contraseña"
                          id="password"
                          autoComplete="new-password"
                          required
                        />
                        <FaLock className="input-icon" />
                      </div>
                      <button type="button" className="btn mt-4" onClick={registerUser} disabled={registerErrors.length > 0}>
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

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
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
font-family: 'Poppins', sans-serif;
font-weight: 300;
font-size: 15px;
line-height: 1.7;
color: #c4c3ca;
background-color: #1f2029;
overflow-x: hidden;

.button-back {
  position: absolute;
  float: left;
  left: 3rem;
  text-decoration: none;
  color: whitesmoke;
  font-weight: 800;
}

.form-style:invalid:required {
  border: none;
  outline: none;
  border: 2px solid red;
}
.form-style:valid:required {
  border: none;
  outline: none;
  border: none;
}


a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
}
h6 span{
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section{
  position: relative;
  width: 100%;
  display: block;
}
.full-height{
  min-height: 100vh;
}
[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label{
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before{
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #102770;
  font-family: 'unicons';
  content: '🠄';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(180deg);
}


.card-3d-wrap {
  position: relative;
  width: 300px;
  max-width: 100%;
  height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 35px;

  @media (min-width: 576px) {
    width: 440px;
  }
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position:absolute;    
  top: 0;
  left: 0;  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out; 
}
.card-front, .card-back {
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap{
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}


.form-group{ 
  position: relative;
  display: block;
    margin: 0;
    padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.form-group input:-ms-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:-moz-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder  {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

.btn{  
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition : all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
}
.btn:active,
.btn:focus{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}
.btn:hover{  
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
}




.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}
.logo img {
  height: 26px;
  width: auto;
  display: block;
}
`;

export default LoginPage;
