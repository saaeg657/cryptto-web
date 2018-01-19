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
    const contents = () => {
      switch (this.props.language) {
        case 'EN':
          return (
            <div style={styles.contents}>
              <h1>Question</h1>
              <h2>Q. I've failed sending purchase tickets transaction. My ether's gone?</h2>
              <p>A. It's ok. If you had failed sending transaction, any change hasn't happened in your account.</p>
              <h2>Q. I won the game! Where can I receive the prize?</h2>
              <p>A. Congratulation! Cryptto don't pay the prize automatically. If you have a winning ticket, "RECEIVE" button appears at "win?" column of Game History table. The due date is limitless</p>
              <h2>Q. Can I know the numbers which I've selected for game?</h2>
              <p>A. Sure, you can identify the numbers you bet on "Bet Numbers" column of Game History table</p>
              <h2>Q. How does drawing numbers work?</h2>
              <p>A. Cryptto get the random numbers from random.org by Oraclize and modify it with blockhash.</p>
            </div>
          )
        case 'KR':
          return (
            <div style={styles.contents}>
              <h1>질문</h1>
              <h2>Q. 티켓 구매 트랜잭션 전송에 실패하였습니다. 제 이더는 사라진건가요?</h2>
              <p>A. 괜찮습니다. 만약 트랜잭션 전송에 실패하였다면, 당신의 계좌에는 아무일도 일어나지 않습니다.</p>
              <h2>Q. 복권에 당첨되었습니다! 어디서 상금을 받을 수 있습니까?</h2>
              <p>A. 축하드립니다! Cryptto는 상금을 자동으로 지급하지않습니다. 당첨되었다면 Game History의 해당 회차에서 "Win?"칸에 상금을 지급받는 트랜잭션을 보낼 수 있는 RECEIVE 버튼이 생길 것 입니다. 지급기간은 무제한입니다.</p>
              <h2>Q. 제가 선택하였던 번호들을 알 수 있습니까?</h2>
              <p>A. 네, 당신은 Game History에서 Bet Numbers칸의 SHOW button을 눌러서 당신이 구입한 번호들을 확인할 수 있습니다.</p>
              <h2>Q. 번호 추첨은 어떤 방식으로 이루어집니까?</h2>
              <p>A. Cryptto는 random.org에서 랜덤 번호를 가져와서 blockhash로 그것을 변형시켜서 사용합니다. </p>
            </div>
          )
      }
    };
    return (
      <div>
        {contents()}
      </div>
    )
  }
}

export default Question;
