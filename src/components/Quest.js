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
    };
  }

  componentDidMount() {
    this.renderAnswers();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer > 0) {
      setTimeout(() => this.setState({
        timer: timer - 1,
        disable: (timer === 1),
        color: (timer === 1),
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
    });
  }

  render() {
    const { quest, dispatch } = this.props;
    const { category, question } = quest;
    const { timer, answers, color, disable } = this.state;
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
        { disable
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => dispatch(actionNextQuestion()) }
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
});

Quest.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  quest: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Quest);
