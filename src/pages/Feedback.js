import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    this.setRankingInLocalStorage(this.getPlayerSpecs());
  }

  // função que retorna as informações do jogador que estão salvas no localStorage
  getPlayerSpecs() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return player;
  }

  // função que retorna a lista de jogadores guardada no localStorage
  getLocalStorageRanking() {
    const rankingKey = JSON.parse(localStorage.getItem('ranking'));
    return rankingKey;
  }

  // função que salva a lista de jogadores no localStorage
  setRankingInLocalStorage({ picture, name, score }) {
    const newPlayer = {
      name,
      score,
      picture,
    };

    const ranking = this.getLocalStorageRanking();
    const isRanking = this.verifyLocalStorageRanking(ranking);

    if (!isRanking) {
      localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    } else {
      ranking.push(newPlayer);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  // função que verifica se o existe a chave ranking no localStorage
  verifyLocalStorageRanking(storageRanking) {
    if (!storageRanking) return false;
    return true;
  }

  renderPlayerSpecs({ picture, name, score }) {
    return (
      <header className="header-feedback">
        <img data-testid="header-profile-picture" src={ picture } alt={ name } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }

  render() {
    const controlNumber = 3;
    const { playerAsserts, playerScore } = this.props;
    return (
      <div className="feedback">
        <div className="main">
          <div>
            {this.renderPlayerSpecs(this.getPlayerSpecs())}
          </div>
          <div className="div-messages">
            <div className="div-msg">
              <p data-testid="feedback-total-question">
                {playerAsserts}
              </p>
              <p data-testid="feedback-text">
                { playerAsserts < controlNumber ? 'Podia ser melhor...' : 'Mandou bem!' }
              </p>
              <p data-testid="feedback-total-score">
                {playerScore}
              </p>
            </div>
          </div>
          <div className="div-button">
            <Link to="/ranking">
              <button
                className="button-ranking"
                data-testid="btn-ranking"
                type="button"
              >
                Ver Ranking
              </button>
            </Link>
            <Link to="/">
              <button
                className="button-play-again"
                data-testid="btn-play-again"
                type="button"
              >
                Jogar novamente
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerAsserts: state.score.asserts,
  playerScore: state.score.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
