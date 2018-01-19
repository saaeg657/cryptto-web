import React from 'react';

const styles = {
  contents: {
    width: '40%',
    margin: 'auto'
  }
};


class Howto extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <div style={styles.contents}>
        <h1>How to Play</h1>
        <h2>Install an available Internet browser</h2>
        <p>CRYPTTO is currently only available in the CHROME browser.</p>
        <p><a href='https://www.google.co.kr/chrome/browser/desktop/index.html'>CHROME download link</a></p>

        <h2>Install METAMASK</h2>
        <p>METAMASK is a world-renowned Ether transmission tool. With METAMASK you can buy tickets securely and easily from your desired wallet.</p>
        <p><a href='https://metamask.io/'>METAMASK extension Download Link</a></p>

        <h2>Buy tickets</h2>
        <p>If you go through the above steps and your balance in METAMASK is over 0.01eth (+ Tx fee), you're all set!</p>
        <p>If you have a game in progress, choose the number you want and buy a ticket!</p>
        <p>Please wait until the draw time!</p>
        <p>Payment of the prize</p>
        <p>You were winning? Congratulations!</p>
        <p>If you have a winning ticket, click on Win Payment to get the prize (Expected Cost: Tx fee)</p>
      </div>
    );
  }
}

export default Howto;
