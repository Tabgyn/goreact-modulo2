import React, { Component } from 'react';
import api from '../../services/api';

import { Container, Form } from './styles';
import logo from '../../assets/logo.png';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    const { repositoryInput, repositories } = this.state;

    try {
      const response = await api.get(`repos/${repositoryInput}`);
      this.setState({
        repositoryInput: '',
        repositories: [...repositories, response.data],
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { repositoryInput, repositories } = this.state;

    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            values={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Ok</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
