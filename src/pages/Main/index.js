import React from 'react';

import { Container, Form } from './styles';
import logo from '../../assets/logo.png';

import CompareList from '../../components/CompareList';

const Main = () => (
  <Container>
    <img src={logo} alt="GitHub Compare" />

    <Form>
      <input type="text" placeholder="usuário/repositório" />
      <button type="submit">Ok</button>
    </Form>

    <CompareList />
  </Container>
);

export default Main;
