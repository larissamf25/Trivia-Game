import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import Load from '../components/Load';
import Quest from '../components/Quest';
import '../styles/Game.css';

class Game extends Component {
  componentDidMount() {
    setTimeout(() => this.backHome(), Number('2000'));
  }

  backHome = () => {
    const { codeBack } = this.props;
    console.log('back:', codeBack);
    if (codeBack === Number('3')) {
      const { history } = this.props;
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  gravatarImg = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  saveScoreLocal = () => {
    const { name, score } = this.props;
    const img = this.gravatarImg();
    const playerObj = { name: [name], score: [score], picture: img };
    const ranking = (JSON.parse(localStorage.getItem('ranking')))
      ? JSON.parse(localStorage.getItem('ranking')) : [];
    localStorage.setItem('ranking', JSON.stringify([...ranking, playerObj]));
  }

  render() {
    const { load, apiTrivia, questionNumber } = this.props;
    if (questionNumber === Number('5')) {
      this.saveScoreLocal();
      return <Redirect to="/feedback" />;
    }
    return (
      <div className="gamePage">
        {
          (load) ? (
            <Load />
          ) : (
            <div>
              <Header />
              <div>
                <div className="divTrivia">
                  {apiTrivia.map((qtn, index) => (
                    <Quest key={ index } quest={ qtn } />
                  ))[questionNumber]}
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Game.propTypes = {
  apiTrivia: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  load: PropTypes.bool.isRequired,
  codeBack: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player: {
  load,
  apiTrivia,
  codeBack,
  questionNumber,
  name,
  score,
} }) => (
  { load, apiTrivia, codeBack, questionNumber, name, score }
);

export default connect(mapStateToProps)(Game);
