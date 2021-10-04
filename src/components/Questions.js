import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import { getScoreAction } from '../actions';
import '../styles/Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivias: '',
      loading: true,
      indexQuestion: 0,
      activeButton: false,
      disabled: false,
      time: 30,
      score: 0,
      asserts: 0,
      arrayOfQuestions: [],
    };

    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
    this.showButtonNext = this.showButtonNext.bind(this);
    this.makeTrivias = this.makeTrivias.bind(this);
    this.questionTimer = this.questionTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
    this.questionTimer();
  }

  makeProps() {
    const { score, asserts } = this.state;
    const { getScore } = this.props;
    getScore(score, asserts);
  }

  async fetchQuestionsAndAnswers() {
    const { token, categories, dificult, type } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&category=${categories}&difficulty=${dificult}&type=${type}&encode=base64&token=${token}`;
    const fetchAPI = await fetch(url);
    const response = await fetchAPI.json();
    const { results } = response;

    this.setState({
      trivias: results,
      loading: false,
    });
  }

  activeButtonNext() {
    const { activeButton, indexQuestion } = this.state;
    const questionsLimit = 4;
    return (
      <button
        className={ activeButton ? '' : 'nextButton' }
        type="button"
        data-testid="btn-next"
        onClick={ () => this.nextQuestion() }
      >
        { indexQuestion === questionsLimit ? this.redirectToFeedback() : 'Próxima' }
      </button>
    );
  }

  redirectToFeedback() {
    return (
      <Link to="/feedback">
        Próxima
      </Link>
    );
  }

  questionTimer() {
    const plus = 1000;
    const questionTimer = setInterval(() => {
      const { time, disabled } = this.state;
      if (!disabled) {
        this.setState({
          time: time - 1,
        });
      }
      if (time <= 0 || disabled) {
        clearInterval(questionTimer);
        this.setState({
          disabled: true,
          time,
          activeButton: true,
        });
        clearInterval(questionTimer);
      }
    }, plus);
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
      activeButton: false,
      disabled: false,
      time: 30,
      arrayOfQuestions: [],
    }, () => this.questionTimer());
  }

  showButtonNext() {
    this.setState({
      activeButton: true,
      disabled: true,
    });
  }

  answerColor(answer) {
    const { activeButton, indexQuestion, trivias } = this.state;
    const correctAnswer = trivias[indexQuestion].correct_answer;

    if (activeButton) {
      return (answer === correctAnswer ? 'green-border' : 'red-border');
    }
  }

  calculateScore() {
    const { time, trivias, indexQuestion, score, asserts } = this.state;
    const easy = 'easy';
    const medium = 'medium';
    const hard = 'hard';
    const three = 3;
    const baseValue = 10;
    const questionDificulty = window.atob(trivias[indexQuestion].difficulty);
    switch (questionDificulty) {
    case easy:
      this.setState({
        score: score + baseValue + (1 * time),
        asserts: asserts + 1,
        activeButton: true,
        disabled: true,
      }, () => this.makeProps());
      break;
    case medium:
      this.setState({
        score: score + baseValue + (2 * time),
        asserts: asserts + 1,
        activeButton: true,
        disabled: true,
      }, () => this.makeProps());
      break;
    case hard:
      this.setState({
        score: score + baseValue + (three * time),
        asserts: asserts + 1,
        activeButton: true,
        disabled: true,
      }, () => this.makeProps());
      break;
    default:
      this.state({
        activeButton: true,
        disabled: true,
      });
    }
  }

  makeTrivias() { // Renderiza Perguntas da Trivia.
    const { trivias, indexQuestion, disabled, arrayOfQuestions, time } = this.state;
    const { category, question } = trivias[indexQuestion];
    const randomizator = 0.5;
    let allQuestions = [trivias[indexQuestion].correct_answer,
      ...trivias[indexQuestion].incorrect_answers];
    const correctAnswer = trivias[indexQuestion].correct_answer;
    const buttons = arrayOfQuestions.length > 0
      ? arrayOfQuestions
      : allQuestions = allQuestions.sort(() => Math.random() - randomizator);
    if (arrayOfQuestions.length === 0) {
      this.setState({
        arrayOfQuestions: buttons,
      });
    }
    return (
      <div>
        <span className="timer">{ time }</span>
        <h1 data-testid="question-category">{ window.atob(category) }</h1>
        <div className="question-box">
          <div className="left-questions">
            <h2 data-testid="question-text">{ window.atob(question) }</h2>
          </div>
          <div className="right-questions">
            <ol>
              { buttons.map(((answer, index) => (
                <li key={ index }>
                  <button
                    name={ answer === correctAnswer ? 'correct' : 'incorrect' }
                    type="button"
                    className={ `${this.answerColor(answer)} answers` }
                    onClick={ answer === correctAnswer
                      ? this.calculateScore : this.showButtonNext }
                    disabled={ disabled }
                    data-testid={ answer === correctAnswer
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    { window.atob(answer) }
                  </button>
                </li>
              ))) }
            </ol>
            <div className="btn-next-div">
              { this.activeButtonNext() }
            </div>
          </div>
        </div>
      </div>
    );
  }

  makeTriviasRender() {
    const { loading } = this.state;
    return loading ? <h1>Loading await...</h1> : this.makeTrivias();
  }

  render() {
    const { load } = this.props;
    return load ? <Loading /> : this.makeTriviasRender();
  }
}

const mapStateToProps = (state) => ({
  load: state.user.load,
  token: state.user.token,
  categories: state.settings.categories,
  dificult: state.settings.dificult,
  type: state.settings.type,
});

const mapDispatchToprops = (dispatch) => ({
  getScore: (scoreValue, assertsValue) => dispatch(
    getScoreAction(scoreValue, assertsValue),
  ),
});

export default connect(mapStateToProps, mapDispatchToprops)(Questions);

Questions.propTypes = {
  timeValue: PropTypes.number,
  disabledValue: PropTypes.bool,
}.isRequired;
