import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const ranking = (JSON.parse(localStorage.getItem('ranking')))
      ? (JSON.parse(localStorage.getItem('ranking'))) : [];
    const rankingSort = ranking.sort((ele1, ele2) => ele2.score - ele1.score);
    this.setState({
      ranking: rankingSort,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
        <div>
          {ranking.map((player, index) => (
            <div key={ index }>
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
              <img src={ player.picture } alt={ player.name } />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
