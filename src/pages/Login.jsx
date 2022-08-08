import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchToken } from '../helpers/fetchAPI';
import { actionPlaySave } from '../redux/actions';
import funcTrivia from '../helpers/funcTrivia';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      name: '',
      email: '',
      redirect: false,
    };
  }

  valButton = () => {
    const { name, email } = this.state;
    let validated = true;
    if (name.length > 0 && email.length > 0) {
      validated = false;
    }
    return validated;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => this.setState({ disable: this.valButton() }));
  }

  handleClick = async () => {
    const { name, email } = this.state;
    const { playerDispatch, apiDispatch } = this.props;
    const tokey = await fetchToken();
    localStorage.setItem('token', tokey.token);
    playerDispatch(name, email);
    apiDispatch();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disable, redirect, name, email } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            placeholder="Digite seu nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Digite seu e-mail"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          { redirect && <Redirect to="/game" /> }
        </form>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configurações
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  playerDispatch: PropTypes.func.isRequired,
  apiDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playerDispatch: (playerN, playerE) => dispatch(actionPlaySave(playerN, playerE)),
  apiDispatch: () => dispatch(funcTrivia()),
});

export default connect(null, mapDispatchToProps)(Login);
