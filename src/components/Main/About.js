import React from 'react';

const styles = {
  contents: {
    width: '40%',
    margin: 'auto'
  }
};


class About extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <div style={styles.contents}>
        <h1>Introduction (What is Cryptto?)</h1>
        <p>Smart contract based lottery system</p>
        <p>Decentralization (not run by a specific group)</p>
        <p>There is no principal to operate.</p>
        <p>Transparency (freedom from manipulation doubt)</p>
        <p>Ticket purchase, lottery, and winnings are all handled through Smart Contract.</p>

        <h1>Is this fair?</h1>
        <p>Probably yes! We don't use numbers from random.org as winning numbers directly.</p>
        <p>Each number in random numbers list from random.org is modified with hash of block number of preceding blocks.</p>
        <p>Therefore, no one including malicious admin of random.org can know which numbers are winning numbers.</p>
        <p>Most of all, you can verify the smart contract!</p>

        <h1>What's different with the existing lottery?</h1>
        <h2>Low fee!</h2>
        <p>The ticket price contains only a little fee (about 10~20%) including tx fee.</p>
        <h2>Flexible difficulty!</h2>
        <p>The number of balls and the range of numbers could be adjusted(1~99).</p>
        <h2>Transparency</h2>
        <p>All the process of game is transparent(fee, prize, the way to draw balls...).</p>
        <p>Owner of the contract cannot steal any prize for game.</p>
        
        <h1>But still, you stick to the existing lottery?</h1>
      </div>
    );
  }
}

export default About;
