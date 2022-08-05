import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      player: '',
      email: '',
      redirect: false,
    };
  }

  valButton = () => {
    const { player, email } = this.state;
    let validated = true;
    if (player.length > 0 && email.length > 0) {
      validated = false;
    }
    return validated;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.setState({ disable: this.valButton() }));
  }

  handleClick = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disable, redirect } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="player"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
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
      </div>
    );
  }
}
