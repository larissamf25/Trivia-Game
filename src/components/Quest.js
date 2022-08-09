import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';
import { actionNextQuestion, actionSumScore } from '../redux/actions/index';

class Quest extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      timer: 30,
      color: false,
      disable: false,
      nextBtn: false,
    };
  }

  componentDidMount() {
    this.renderAnswers();
  }

  componentDidUpdate() {
    const { timer, color } = this.state;
    if (timer > 0) {
      setTimeout(() => this.setState({
        timer: timer - 1,
        disable: (timer === 1) || color === true,
        color: (timer === 1) || color === true,
        nextBtn: (timer === 1) || color === true,
      }), Number('1000'));
    }
  }

  renderAnswers = () => {
    const { quest } = this.props;
    const wrongQuest = quest.incorrect_answers;
    const allAnsw = [quest.correct_answer, ...wrongQuest];
    const shortAnsw = allAnsw.sort(() => Math.random() - Number('0.5'));
    this.setState({ answers: shortAnsw });
  }

    funcDifficulty = () => {
      const { quest: { difficulty } } = this.props;
      if (difficulty === 'easy') {
        return 1;
      } if (difficulty === 'medium') {
        return 2;
      }
      return Number('3');
    }

  handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'correct-answer') {
      const { dispatchScore } = this.props;
      const { timer } = this.state;
      const difficulty = this.funcDifficulty();
      const result = Number('10') + (timer * difficulty);
      dispatchScore(result);
    }
    this.setState({
      color: true,
      disable: true,
      nextBtn: true,
    });
  }

  handleNext = () => {
    const { dispatchNextQuestion } = this.props;
    dispatchNextQuestion();
  }

  render() {
    const { quest } = this.props;
    const { category, question } = quest;
    const { timer, answers, color, disable, nextBtn } = this.state;
    const resp = quest.correct_answer;

    const btnQuest = answers.map((elm, i) => {
      if (elm === resp) {
        return (
          <button
            type="button"
            key={ elm }
            name="correct-answer"
            data-testid="correct-answer"
            onClick={ this.handleClick }
            className={ color ? 'right' : '' }
            disabled={ disable }
          >
            {elm}
          </button>
        );
      }
      return (
        <button
          type="button"
          key={ elm }
          name="wrong-answer"
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.handleClick }
          className={ color ? 'false' : '' }
          disabled={ disable }
        >
          {elm}
        </button>
      );
    });
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <span data-testid="answer-options">
          { btnQuest }
        </span>
        <span>{timer}</span>
        { nextBtn
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNext }
            >
              Next
            </button>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (value) => dispatch(actionSumScore(value)),
  dispatchNextQuestion: () => dispatch(actionNextQuestion()),
});

Quest.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  quest: PropTypes.string.isRequired,
  dispatchNextQuestion: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Quest);
