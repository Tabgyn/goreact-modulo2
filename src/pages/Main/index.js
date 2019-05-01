import React, { Component } from 'react';
import moment from 'moment';

import { Container, Form } from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    const localState = JSON.parse(localStorage.getItem('myState'));

    if (localState) {
      this.setState({ repositories: localState.repositories });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { repositories } = this.state;
    if (nextState.repositories !== repositories && typeof Storage !== 'undefined') {
      localStorage.setItem('myState', JSON.stringify(nextState));
    }

    return true;
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      if (repositories.find(repo => repo.id === repository.id)) {
        throw new Error('Repository already added');
      }

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading, repositoryError, repositoryInput, repositories,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />

        <Form onSubmit={this.handleAddRepository} withError={repositoryError}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
