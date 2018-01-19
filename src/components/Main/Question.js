import React from 'react';

const styles = {
  contents: {
    width: '70%',
    margin: 'auto',
    marginBottom: 150,
  }
}

class Question extends React.Component {
  render() {
    return (
      <div style={styles.contents}>
        <h1>Question</h1>
        <h2>Q. I've failed sending purchase tickets transaction. My ether's gone?</h2>
        <p>A. It's ok. If you had failed sending transaction, any change hasn't happened in your account.</p>
        <h2>Q. I won the game! Where can I receive the prize?</h2>
        <p>A. Congratulation! We don't pay the prize automatically. You should send transaction to be paid the winning prize at this (link)</p>
      </div>
    )
  }
}

export default Question;
