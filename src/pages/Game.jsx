import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Load from '../components/Load';
import Quest from '../components/Quest';

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

  render() {
    const { load, apiTrivia, questionNumber } = this.props;
    if (questionNumber === Number('5')) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        {
          (load) ? (
            <Load />
          ) : (
            <div>
              <Header />
              <div>
                {apiTrivia.map((qtn, index) => (
                  <Quest key={ index } quest={ qtn } />
                ))[questionNumber]}
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
};

const mapStateToProps = ({ player: { load, apiTrivia, codeBack, questionNumber } }) => (
  { load, apiTrivia, codeBack, questionNumber }
);

export default connect(mapStateToProps)(Game);
