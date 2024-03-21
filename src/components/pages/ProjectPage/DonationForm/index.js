import { useState, useEffect } from 'react';
import {
  Form, FormGroup, FormLabel, FormControl, Button, InputGroup,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../../../api';
import localAPI from '../../../../api/localAPI';

function DonationForm({
  projectId, acceptHandler, errorHandler, infoHandler,
}) {
  const paymentSystems = ['Binance', 'Paypal', 'C2P'];
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [transaction, setTransaction] = useState({
    reference_number: '',
    payment_system: paymentSystems[0],
    amount: 0,
    user_id: null,
    project_id: null,
  });

  function createTransaction(C2PTransaction) {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      const transactionModified = { ...transaction, user_id: tokenData.sub, project_id: projectId };

      if (C2PTransaction) {
        transactionModified.reference_number = C2PTransaction.reference_number;
      } else {
        const exchangeRate = process.env.REACT_APP_EXCHANGE_RATE;
        transactionModified.amount *= parseFloat(exchangeRate);
      }

      api.post('/transactions', transactionModified)
        .then((response) => {
          setTransaction(response.data);

          const description = '¡El pago se verificará pronto, te agradecemos enormemente por tu colaboración!';
          infoHandler('Pago enviado para verificar', description);
        })
        .catch((error) => {
          const { status } = error.response;

          switch (status) {
            case 401:
              navigate('/login');
              break;
            default:
              infoHandler('Error inesperado', 'Ha ocurrido un error inesperado');
              break;
          }
        });
    } else {
      navigate('/login');
    }
  }

  function createC2P() {
    // eslint-disable-next-line no-undef
    payWithPuntoYa(transaction.amount, (response) => {
      if (response.ok) {
        createTransaction({ reference_number: response.transactionId });
      } else {
        errorHandler('Error en el pago C2P', response.description);
      }
    });
  }

  function handleChange(event) {
    const transactionModified = { ...transaction };
    transactionModified[event.target.name] = event.target.value;
    setTransaction(transactionModified);
  }

  function handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      if (transaction.payment_system === paymentSystems[2]) {
        createC2P();
      } else {
        createTransaction();
      }
      acceptHandler();
    }
    setValidated(true);
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://puntoyapos.com.ve/pos/assets/scripts/py-script.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <FormGroup className="my-1">
        <FormLabel htmlFor="payment-system">Plataforma de pago</FormLabel>
        <Form.Select
          id="payment-system"
          name="payment_system"
          value={transaction.payment_system}
          onChange={handleChange}
        >
          {
            paymentSystems.map((system) => (
              <option value={system} key={system}>
                {system}
              </option>
            ))
          }
        </Form.Select>
      </FormGroup>
      <FormGroup hidden={transaction.payment_system === paymentSystems[2]} className="my-1">
        <FormLabel htmlFor="reference-number">Número de referencia</FormLabel>
        <FormControl
          id="reference-number"
          type="text"
          name="reference_number"
          placeholder=""
          value={transaction.reference_number}
          onChange={handleChange}
          autoComplete="on"
          required={transaction.payment_system !== paymentSystems[2]}
        />
      </FormGroup>

      <FormGroup className="my-1">
        <FormLabel htmlFor="amount">Monto</FormLabel>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            {transaction.payment_system === paymentSystems[2] ? 'Bs. ' : 'USD ($)'}
          </InputGroup.Text>
          <FormControl
            id="amount"
            type="number"
            name="amount"
            placeholder=""
            min="1"
            isValid={transaction.amount > 0}
            value={transaction.amount}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </InputGroup>
      </FormGroup>
      <Button type="submit" className="mt-3">Enviar pago</Button>
    </Form>

  );
}

DonationForm.propTypes = {
  projectId: PropTypes.number.isRequired,
  acceptHandler: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  infoHandler: PropTypes.func.isRequired,
};

export default DonationForm;
