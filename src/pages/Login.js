import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction, fetchAPItoken } from '../actions/index';
import '../styles/Login.css';
import loginImage from '../styles/images/login-img.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.inputsValidation = this.inputsValidation.bind(this);
    this.handleGetEmail = this.handleGetEmail.bind(this);
    this.tokenRequire = this.tokenRequire.bind(this);

    this.state = {
      name: false,
      email: false,
    };
  }

  componentWillUnmount() {
    this.handleGetEmail();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async tokenRequire() {
    const { fetchAPI, tokenAPI } = this.props;
    fetchAPI();
    localStorage.setItem('token', tokenAPI);
  }

  inputsValidation() {
    const { email, name } = this.state;
    const emailValidation = /(.*)@(.*).com/.test(email);
    const charactersName = name.length;
    const minimoName = 1;
    if (charactersName >= minimoName && emailValidation === true) {
      return false;
    }
    return true;
  }

  // manda pro estado do redux o nome e email do jogador
  handleGetEmail() {
    const { email, name } = this.state;
    const { getEmail } = this.props;
    getEmail(email, name);
  }

  nameAndEmailInputs() {
    return (
      <>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Coloque seu nome aqui :)"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          id="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="E-mail aqui :)"
          onChange={ this.handleChange }
        />
      </>
    );
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="left">
            <img src={ loginImage } className="img-login" alt="login" />
          </div>
          <div className="right">
            <h6 className="login-title-span">Bem vindo(a) ao</h6>
            <h4 className="login-title">Kahootrivia</h4>
            <form className="form-login">
              { this.nameAndEmailInputs() }
            </form>
            <Link to="/trivia">
              <button
                className="button-play"
                disabled={ this.inputsValidation() }
                data-testid="btn-play"
                type="button"
                onClick={ () => this.tokenRequire() }
              >
                JOGAR
              </button>
            </Link>
            <Link to="/settings">
              <button
                className="settings-link"
                data-testid="btn-settings"
                type="button"
                onClick={ () => this.tokenRequire() }
              >
                CONFIGURAÇÕES
              </button>
            </Link>
          </div>
        </div>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPItoken()),
  getEmail: (emailInput, nameInput) => dispatch(loginAction(emailInput, nameInput)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getEmail: PropTypes.func,
  fetchAPI: PropTypes.func,
  tokenAPI: PropTypes.string,
}.isRequired;
