import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../styles/Trivia.css';

class Trivia extends Component {
  render() {
    return (
      <div className="trivia-page">
        <Header />
        <Questions />
      </div>);
  }
}

export default Trivia;
