import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
feedbackAnswers = () => {
  const { correctAnswers } = this.props;
  if (correctAnswers < Number('3')) {
    return 'Could be better...';
  }
  return 'Well Done!';
}

render() {
  return (
    <div>
      <Header />
      <h1>Feedback</h1>
      <span
        data-testid="feedback-text"
      >
        {this.feedbackAnswers()}
      </span>
    </div>
  );
}
}

Feedback.propTypes = {
  correctAnswers: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { correctAnswers } }) => ({
  correctAnswers,
});

export default connect(mapStateToProps, null)(Feedback);
