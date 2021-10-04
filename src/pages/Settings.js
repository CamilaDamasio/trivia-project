import React from 'react';
import '../styles/Settings.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSettingsAction } from '../actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      categories: '',
      dificulty: '',
      type: '',
      loading: true,
    };
    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
  }

  componentDidUpdate() {
    this.makeProps();
  }

  makeProps() {
    const { categories, dificulty, type } = this.state;
    const { getSettings } = this.props;

    getSettings(categories, dificulty, type);
  }

  async fetchQuestionsAndAnswers() {
    const url = 'https://opentdb.com/api_category.php';
    const fetchAPI = await fetch(url);
    const response = await fetchAPI.json();
    const result = response.trivia_categories;

    this.setState({
      result,
      loading: false,
    });
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { result, loading } = this.state;
    if (loading) {
      return (<h1>Loading...</h1>);
    }
    return (
      <div className="settings-page">
        <div className="settings-text">
          <h1 data-testid="settings-title">SETTINGS</h1>
        </div>
        <div className="inputs-settings">
          <select className="categories" name="categories" onChange={ this.handleChange }>
            { result.map((category) => (
              <option key={ category.id } value={ category.id }>
                { category.name }
              </option>
            )) }
          </select>
          <select className="dificulty" name="dificulty" onChange={ this.handleChange }>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select className="type" name="type" onChange={ this.handleChange }>
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>

        <div className="settings-button-home">
          <Link to="/">
            <button className="settings" type="button">
              VOLTAR PARA PAGINA INICIAL
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToprops = (dispatch) => ({
  getSettings: (categoriesValue, dificultValue, typeValue) => dispatch(
    getSettingsAction(categoriesValue, dificultValue, typeValue),
  ),
});

export default connect(null, mapDispatchToprops)(Settings);

Settings.propTypes = {
  getSettings: PropTypes.func,
}.isRequired;
