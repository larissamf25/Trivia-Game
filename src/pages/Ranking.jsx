import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

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
      <div className="allRanking">
        <div className="rankingPage">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="divBtnHome">
            <Link to="/">
              <button
                type="button"
                data-testid="btn-go-home"
                className="buttonHome"
              >
                Home
              </button>
            </Link>
          </div>
          <div className="rankingList">
            {ranking.map((player, index) => (
              <div
                key={ index }
                className="playerRanking"
              >
                <span data-testid={ `player-name-${index}` }>{player.name}</span>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
                <img className="imagePlayer" src={ player.picture } alt={ player.name } />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
