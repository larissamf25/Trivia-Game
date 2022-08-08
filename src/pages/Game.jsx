import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Load from '../components/Load';
import Quest from '../components/Quest';

class Game extends Component {
  componentDidMount() {
    this.backHome();
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
    const { load, apiTrivia } = this.props;
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
                ))[0]}
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
};

const mapStateToProps = ({ play: { load, apiTrivia, codeBack } }) => (
  { load, apiTrivia, codeBack }
);

export default connect(mapStateToProps)(Game);
