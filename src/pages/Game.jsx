import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Load from '../components/Load';
import Quest from '../components/Quest';

class Game extends Component {
  componentDidMount() {
    const back = localStorage.getItem('back');
    if (back === Number('3')) {
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
                ))}
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
};

const mapStateToProps = ({ play: { load, apiTrivia } }) => ({ load, apiTrivia });

export default connect(mapStateToProps)(Game);
