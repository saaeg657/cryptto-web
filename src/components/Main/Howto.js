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
    const contents = () => {
      switch (this.props.language) {
        case 'EN':
          return (
            <div style={styles.contents}>
              <h1>How to Play</h1>
              <h2>Install an available Internet browser</h2>
              <p>CRYPTTO is currently only available in the CHROME, FIREFOX, OPERA browser.</p>

              <h2>Install METAMASK</h2>
              <p>METAMASK is a world-renowned Ether transmission tool. With METAMASK you can buy tickets securely and easily from your desired wallet.</p>
              <p><a href='https://metamask.io/'>METAMASK extension Download Link</a></p>

              <h2>Buy tickets</h2>
              <p>If you go through the above steps and your balance in METAMASK is over 0.01eth (+ Tx fee), you're all set!</p>
              <p>If you have a game in progress, choose the number you want and buy a ticket!</p>
              <p>And please wait until the draw time!</p>

              <h2>Payment of the prize</h2>
              <p>You were winning? Congratulations!</p>
              <p>If you have a winning ticket, "RECEIVE" button appears at "win?" column of Game History table.</p>
            </div>
          );
        case 'KR':
          return (
            <div style={styles.contents}>
              <h1>이용방법</h1>
              <h2>이용가능한 웹 브라우저를 설치합니다.</h2>
              <p>CRYPTTO 는 현재 CHROME, FIREFOX, OPERA 브라우저에서만 사용이 가능합니다</p>

              <h2>METAMASK를 설치합니다</h2>
              <p>METAMASK는 이더리움 트랜잭션을 전송할 수 있는 유용한 툴입니다.</p>
              <p>Cryptto는 안전한 티켓 구매를 위해 METAMASK 사용을 권장합니다.</p>
              <p><a href='https://metamask.io/'>METAMASK extension Download Link</a></p>

              <h2>티켓 구매</h2>
              <p>위의 과정을 모두 완료하였고, 당신의 계좌 잔고가 0.01eth (+트랜잭션 수수료)이상이라면, 모든 준비는 끝났습니다!</p>
              <p>만약 현재 게임이 진행중이라면, 원하는 번호와 티켓의 갯수를 선택하고 SEND버튼을 클릭하세요.</p>
              <p>그리고 추첨 시간까지 기다리세요!</p>

              <h2>상금 지불</h2>
              <p>당첨되셨습니까? 축하드립니다!</p>
              <p>만약 당신의 티켓이 당첨되었다면, Game History의 해당 회차에서 "Win?"칸에 상금을 지급받는 트랜잭션을 보낼 수 있는 RECEIVE 버튼이 생길 것 입니다.</p>
            </div>
          );
      }
    }
    return (
      <div>
        {contents()}
      </div>
    );
  }
}

export default Howto;
