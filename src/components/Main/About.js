import React from 'react';

const styles = {
  contents: {
    width: '40%',
    margin: 'auto',
    marginBottom: 150
  }
};


class About extends React.Component {
  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.language != this.props.language) return true;
    return true;
  }

  render() {
    const contents = () => {
      switch (this.props.language) {
        case 'EN':
          return (
            <div>
              <h1>Introduction (What is Cryptto?)</h1>
              <p>Smart contract based lottery system</p>
              <p>Decentralization (not run by a specific group)</p>
              <p>Transparency (freedom from manipulation doubt)</p>
              <p>Ticket purchase, lottery, and winnings are all handled through Smart Contract.</p>

              <h1>Global Lottery!</h1>
              <p>The existing lottery is only limited to people who live there.</p>
              <p>However, any ethereum user can play Cryptto.</p>
      
              <h1>Is this fair?</h1>
              <p>Yes! It doesn't use numbers from random.org as winning numbers directly.</p>
              <p>Each number in random numbers list from random.org is modified with hash of block number of preceding blocks.</p>
              <p>Therefore, no one including malicious admin of random.org can know which numbers are winning numbers.</p>
              <p>Compared to the existing doubtful lottery, Cryptto is fair lottery.</p>
              <p>Most of all, you can verify the smart contract!</p>
      
              <h1>What's different with the existing lottery?</h1>
              <h2>Low fee!</h2>
              <p>The ticket price contains only a little fee (about 10%) including tx fee.</p>
              <p>Just think about the existing lottery's expensive fee.</p>
              <h2>Flexible difficulty!</h2>
              <p>The number of balls and the range of numbers could be adjusted.(1~99)</p>
              <h2>Transparency</h2>
              <p>All the process of game is transparent(fee, prize, the way to draw balls...).</p>
              <p>Owner of the contract cannot steal any prize for game.</p>
              
              <h1>But still, you stick to Powerball instead of Cryptto?</h1>
            </div>
          );
        case 'KR':
          return (
            <div>
              <h1>소개 (Cryptto란 무엇인가?)</h1>
              <p>이더리움 스마트 컨트랙트 기반의 로또</p>
              <p>특정 기관에서 운영되는 것이 아닌 탈중앙화구조</p>
              <p>투명한 운영(조작가능성제로)</p>
              <p>티켓 구매, 복권 구조, 추첨등의 모든 과정이 스마트 컨트랙트에 의해 이루어짐</p>
              <p>번호 추첨은 random.org로부터 받아와서 blockhash를 더해서 한번 더 변형시킴</p>

              <h1>국경을 초월한 복권!</h1>
              <p>기존의 복권은 발행한 국가의 국민이 아니면 구입이 제한되어 있는 구조였습니다.</p>
              <p>하지만 Cryptto는 이더리움 이용자라면 누구든지 이용이 가능합니다.</p>
      
              <h1>그래서 이것은 공정합니까?</h1>
              <p>네, 그렇습니다! Cryptto는 random.org에서 받아온 번호를 그대로 쓰지않습니다.</p>
              <p>random.org에서 받아온 번호는 추첨하는 트랜잭션을 채굴한 block의 이전 block들의 blockhash들이 더해져서 한번 더 변형됩니다.</p>
              <p>따라서, 악의를 가진 random.org의 운영자를 포함한 다른 세력들에 의해서 조작될 가능성이 없습니다.</p>
              <p>기존의 조작의심을 받는 복권들과 비교하면, Cryptto는 공정한 복권이라고 할 수 있습니다.</p>
              <p>무엇보다도, 당신은 이 모든것을 스마트 컨트랙트를 통해서 검증할 수 있습니다.</p>
      
              <h1>기존의 복권과는 무엇이 다릅니까?</h1>
              <h2>낮은 수수료!</h2>
              <p>티켓의 수수료는 트랜잭션 수수료를 포함하여 고작 10% 정도밖에 되지않습니다.</p>
              <p>기존의 복권들이 가져가는 수수료를 생각해보면 이것은 아주 낮은 수수료입니다.</p>
              <h2>유동적인 난이도</h2>
              <p>당첨 번호의 개수와 최대 번호는 이용자수에 따라서 변화할 수 있습니다.(1~99)</p>
              <h2>투명성</h2>
              <p>컨트랙트는 당첨 번호를 조작하거나 상금을 마음대로 가져갈 수 없습니다.</p>
              <p>이 모든 과정은 스마트 컨트랙트를 통해서 투명하게 공개됩니다.(수수료, 상금, 추첨방식...)</p>
              
              <h1>이래도, 당신은 Cryptto 대신 Lotto를 사시겠습니까?</h1>
            </div>
          )
      }
    }
    return (
      <div style={styles.contents}>
        {contents()}
      </div>
    );
  }
}

export default About;
