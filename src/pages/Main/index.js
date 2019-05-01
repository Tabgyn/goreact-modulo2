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

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      const repository = await this.getRepository(repositoryInput);

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        'myRepositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  getRepository = async (name) => {
    const { data: repository } = await api.get(`repos/${name}`);

    repository.lastCommit = moment(repository.pushed_at).fromNow();

    return repository;
  };

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('myRepositories')) || [];

  handleDeleteRepository = async (id) => {
    const { repositories } = this.state;

    const keptRepositories = repositories.filter(repo => repo.id !== id);

    this.setState({ repositories: keptRepositories });

    await localStorage.setItem('myRepositories', JSON.stringify(keptRepositories));
  };

  handleUpdateRepositories = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const updated = await this.getRepository(repository.full_name);

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === updated.id ? updated : repo)),
      });

      await localStorage.setItem('myRepositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
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

        <CompareList
          repositories={repositories}
          deleteHandler={this.handleDeleteRepository}
          updateHandler={this.handleUpdateRepositories}
        />
      </Container>
    );
  }
}
