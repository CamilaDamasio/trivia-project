// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class Timer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       disabled: false,
//       time: 30,
//       buttonValue: false,
//     };

//     this.questionTimer = this.questionTimer.bind(this);
//     // this.makeProps = this.makeProps.bind(this);
//   }

//   componentDidMount() {
//     // this.makeProps();
//     this.questionTimer();
//   }

//   // componentDidUpdate() {
//   //   this.makeProps();
//   // }

//   // Funcao que conta 30 segundos para responder a pergunta
//   questionTimer() {
//     const plus = 1000;
//     const questionTimer = setInterval(() => {
//       const { time } = this.state;
//       this.setState({
//         time: time - 1,
//       });
//       if (time <= 0) {
//         clearInterval(questionTimer);
//         this.setState({
//           disabled: true,
//           time: 'Tempo Esgotado',
//           buttonValue: true,
//         });
//       }
//     }, plus);
//   }

//   // makeProps() {
//   //   const { disabled, time, buttonValue } = this.state;
//   //   const { getTime } = this.props;

//   //   getTime(time, disabled, buttonValue);
//   // }

//   render() {
//     const { time } = this.state;
//     return (
//       <span id="timer">
//         { time }
//       </span>);
//   }
// }

// // const mapDispatchToProps = (dispatch) => ({
// //   getTime: (timeValue, disabledValue, buttonValue) => dispatch(
// //     timerAction(timeValue, disabledValue, buttonValue),
// //   ),
// // });

// export default Timer

// Timer.propTypes = {
//   getTime: PropTypes.func,
// }.isRequired;
