import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';
import '../styles/Header.css';

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
      <div className="feedbackPage">
        <h1>Feedback</h1>
        <div className="infoFeedback">
          <span
            data-testid="feedback-text"
            className="phraseFeedback"
          >
            {this.feedbackAnswers()}
          </span>
          <span>Pontos:</span>
          <span
            data-testid="feedback-total-score"
            className="phraseFeedback"
          >
            { score }
          </span>
          <span>Questões:</span>
          <span
            data-testid="feedback-total-question"
          >
            { assertions }
          </span>
        </div>
        <div className="btnsFeedback">
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
              className="btnFeedback"
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
              className="btnFeedback"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
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
