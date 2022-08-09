import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
feedbackAnswers = () => {
  const { assertions } = this.props;
  if (assertions < Number('3')) {
    return 'Could be better...';
  }
  return 'Well Done!';
}

render() {
  const { score, assertions } = this.props;
  return (
    <div>
      <Header />
      <h1>Feedback</h1>
      <span
        data-testid="feedback-text"
      >
        {this.feedbackAnswers()}
      </span>
      <span
        data-testid="feedback-total-score"
      >
        { score }
      </span>
      <span
        data-testid="feedback-total-question"
      >
        { assertions }
      </span>
    </div>
  );
}
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps, null)(Feedback);
