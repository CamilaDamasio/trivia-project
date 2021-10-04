import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  // armazena a lista de pessoas no ranking
  getLocalStorageRanking() {
    const rankingKey = JSON.parse(localStorage.getItem('ranking'));
    return rankingKey;
  }

  // função que ordena os jogadores pela pontuação
  sortByScore(scores) {
    return scores.sort((a, b) => (b.score - a.score));
  }

  // constrói a estrutura das informações de cada pessoa na página de ranking
  buildsPlayerResults({ name, picture, score }, index) {
    return (
      <ul className="player-specs">
        <li className="ranking-img">
          <img src={ picture } alt={ name } className="img-render-ranking" />
        </li>
        <li className="ranking-name" data-testid={ `player-name-${index}` }>{ name }</li>
        <li
          className="ranking-score"
          data-testid={ `player-score-${index}` }
        >
          { score }

        </li>
      </ul>
    );
  }

  resetPlayerSpecs() {
    const playerReseted = {
      assertions: 0,
      gravatarEmail: '',
      name: '',
      picture: '',
      score: 0,
    };
    localStorage.setItem('state', JSON.stringify({ player: playerReseted }));
  }

  // função para renderizar a lista de ranking
  renderPlayersResults() {
    const players = this.getLocalStorageRanking();
    const playersSorted = this.sortByScore(players);
    return playersSorted.map((player, index) => this.buildsPlayerResults(player, index));
  }

  render() {
    return (
      <div className="ranking">
        <div className="title-button">
          <h1 data-testid="ranking-title">Ranking</h1>
          <Link to="/">
            <button
              className="button-start"
              data-testid="btn-go-home"
              type="button"
              onClick={ this.resetPlayerSpecs }
            >
              Início
            </button>
          </Link>
        </div>
        <div className="players">
          {/* Requisito 18 precisa que o requisito 10 esteja pronto */}
          { this.renderPlayersResults() }
        </div>
      </div>);
  }
}

export default Ranking;
