import React, { Component } from 'react';

export default class Quest extends Component {
  constructor() {
    super();

    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    this.renderAnswers();
  }

  renderAnswers = () => {
    const { quest } = this.props;
    const allAnsw = [quest.correct_answer, quest.incorrect_answers];
    this.setState({ answers: allAnsw });
  }

  render() {
    return (
      <div>Quest</div>
    );
  }
}
