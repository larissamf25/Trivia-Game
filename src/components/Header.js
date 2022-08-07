import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
    gravatarImg = (email) => {
      const hash = md5(email).toString();
      return `https://www.gravatar.com/avatar/${hash}`;
    }

    render() {
      const { name, email, score } = this.props;
      return (
        <div>
          <img
            src={ this.gravatarImg(email) }
            alt="imagem gravatar"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </div>
      );
    }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ play: { name, email, score } }) => ({
  name,
  email,
  score,
});

export default connect(mapStateToProps)(Header);
