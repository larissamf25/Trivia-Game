import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default class Quest extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      timer: 30,
      color: false,
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

  changeColor = () => {
    this.setState({
      color: true,
    });
  }

  render() {
    const { quest } = this.props;
    const { category, question } = quest;
    const { timer, answers, color } = this.state;
    const resp = quest.correct_answer;

    const btnQuest = answers.map((elm, i) => {
      if (elm === resp) {
        return (
          <button
            type="button"
            key={ elm }
            data-testid="correct-answer"
            onClick={ this.changeColor }
            className={ color ? 'right' : '' }
          >
            {elm}
          </button>
        );
      }
      return (
        <button
          type="button"
          key={ elm }
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.changeColor }
          className={ color ? 'false' : '' }
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
      </div>
    );
  }
}

Quest.propTypes = {
  quest: PropTypes.string.isRequired,
};
