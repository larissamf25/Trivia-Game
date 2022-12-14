import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

class Header extends Component {
    gravatarImg = (email) => {
      const hash = md5(email).toString();
      return `https://www.gravatar.com/avatar/${hash}`;
    }

    render() {
      const { name, email, score } = this.props;
      return (
        <div className="divHeader">
          <div className="insiderDivHeader">
            <img
              className="imgHeader"
              src={ this.gravatarImg(email) }
              alt="imagem gravatar"
              data-testid="header-profile-picture"
            />
            <span data-testid="header-player-name">{ name }</span>
          </div>
          <div className="divScore">
            <p>Pontos: </p>
            <span data-testid="header-score">{ score }</span>
          </div>
        </div>
      );
    }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { name, email, score } }) => ({
  name,
  email,
  score,
});

export default connect(mapStateToProps)(Header);
