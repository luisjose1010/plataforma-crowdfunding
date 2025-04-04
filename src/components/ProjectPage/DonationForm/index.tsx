import { useState } from 'react';
import {
  Button, Form, FormControl, FormGroup,
  FormLabel, InputGroup,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import api from '@/api';
import localAPI from '@/api/localAPI';
import { Transaction } from "@/lib/types";

interface DonationFormProps {
  projectId: string;
  acceptHandler: () => void;
  errorHandler: (
    { title, description }: { title: string, description: string }
  ) => void;
  infoHandler: (
    { title, description }: { title: string, description: string }
  ) => void;
}

function DonationForm({
  projectId, acceptHandler, errorHandler, infoHandler,
}: DonationFormProps) {
  const paymentSystems = ['Binance', 'PayPal'];
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>({
    id: '',
    reference_number: '',
    payment_system: paymentSystems[0],
    amount: 0,
    created_at: '',
    updated_at: '',
    user_id: null,
    project_id: null,
  });

  function createTransaction() {
    const tokenData = localAPI.getTokenData();

    if (tokenData) {
      const transactionModified = { ...transaction, user_id: tokenData.sub, project_id: projectId };
      const exchangeRate = import.meta.env.VITE_EXCHANGE_RATE;

      transactionModified.amount *= parseFloat(exchangeRate);

      api.post('/transactions', transactionModified)
        .then((response) => {
          setTransaction(response.data);

          const title = 'Pago enviado para verificar'
          const description = '¡El pago se verificará pronto, te agradecemos enormemente por tu colaboración!';
          infoHandler({ title, description });
        })
        .catch((error) => {
          const { status } = error.response;

          switch (status) {
            case 401:
              navigate('/login');
              break;
            default:
              errorHandler({
                title: 'Error inesperado',
                description: 'Ha ocurrido un error inesperado'
              });
              break;
          }
        });
    } else {
      navigate('/login');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTransaction = { ...transaction, [event.target.name]: event.target.value };
    setTransaction(newTransaction);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newTransaction = { ...transaction, [event.target.name]: event.target.value };
    setTransaction(newTransaction);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      createTransaction();
      acceptHandler();
    }
    setValidated(true);
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <FormGroup className="my-1">
        <FormLabel htmlFor="payment-system">Plataforma de pago</FormLabel>
        <Form.Select
          id="payment-system"
          name="payment_system"
          value={transaction.payment_system}
          onChange={handleSelectChange}
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
      <FormGroup className="my-1">
        <FormLabel htmlFor="reference-number">Número de referencia</FormLabel>
        <FormControl
          id="reference-number"
          type="text"
          name="reference_number"
          placeholder=""
          onChange={handleChange}
          autoComplete="off"
          required
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
            autoComplete="off"
          />
        </InputGroup>
      </FormGroup>
      <Button type="submit" className="mt-3">Enviar pago</Button>
    </Form>

  );
}

export default DonationForm;
