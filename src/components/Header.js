import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      criptoEmail: '',
      imgGravatar: '',
    };

    this.emailCript = this.emailCript.bind(this);
    this.gravatar = this.gravatar.bind(this);
    this.setPlayerInLocalStorage = this.setPlayerInLocalStorage.bind(this);
  }

  async componentDidMount() {
    this.emailCript();
    await this.gravatar();
    this.setPlayerInLocalStorage();
  }

  componentDidUpdate() {
    this.updatePlayerSpecsInLocalStorage();
  }

  // função que guarda as informações do jogador no localStorage
  setPlayerInLocalStorage() {
    const { criptoEmail, imgGravatar } = this.state;
    const { nameUser } = this.props;
    const player = {
      name: nameUser,
      assertions: 0,
      score: 0,
      gravatarEmail: criptoEmail,
      picture: imgGravatar,
    };

    localStorage.setItem('state', JSON.stringify({ player }));
  }

  updatePlayerSpecsInLocalStorage() {
    const { criptoEmail, imgGravatar } = this.state;
    const { nameUser, playerScore, playerAsserts } = this.props;
    const player = {
      name: nameUser,
      assertions: playerAsserts,
      score: playerScore,
      gravatarEmail: criptoEmail,
      picture: imgGravatar,
    };

    localStorage.setItem('state', JSON.stringify({ player }));
  }

  // criptografia do email para a api gravatar
  emailCript() {
    const { emailUser } = this.props;
    const stringEmail = md5(emailUser).toString();
    this.setState({
      criptoEmail: stringEmail,
    });
  }

  // função para pegar a imagem na api do gravatar
  async gravatar() {
    const { criptoEmail } = this.state;
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${criptoEmail}`);
    this.setState({
      imgGravatar: fetchGravatar.url,
    });
  }

  render() {
    const { imgGravatar } = this.state;
    const { nameUser, playerScore } = this.props;
    return (
      <div className="header">
        <header>
          <img
            alt="imagem jogador"
            data-testid="header-profile-picture"
            src={ imgGravatar }
          />
          <p data-testid="header-player-name">{ nameUser }</p>
          <p data-testid="header-score">
            { playerScore }
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.user.name,
  emailUser: state.user.email,
  playerScore: state.score.score,
  playerAsserts: state.score.asserts,
});

export default connect(mapStateToProps)(Header);

// proptypes do componente Header
Header.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
