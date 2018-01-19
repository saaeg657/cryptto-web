import React from 'react';
import moment from 'moment';
import BigNumber from 'big-number';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { NavLink, withRouter } from 'react-router-dom';
import { AppBar } from 'material-ui';
import Drawer from 'material-ui/Drawer';

import { web3, crypttoContract } from '../../utils/web3';
import { getEthData } from '../../utils/convert.util';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // overflowY: 'scroll'
  },
  contents: {
    width: '60%',
    float: 'left',
  },
  title: {
    fontSize: 50,
    margin: 50
  },
  networkInfo: {
    fontSize: 20,
  },
  accountInfo: {
    fontSize: 20
  },
  gameInfo: {
    width: '80%',
    margin: 'auto',
  },
  currentGameInfo: {
    marginTop: 100,
    width: '20%',
    fontSize: 20,
    float: 'left',
  },
  prevGameInfo: {
    marginTop: 100,
    width: '20%',
    fontSize: 20,
    float: 'right'
  },
  txForm: {
    width: '100%',
    margin: 50
  },
  ticketForm: {
    width: '100%',
    height: 500,
    overflowY: 'scroll',
  },
  txTextField: {
    marginRight: 20,
    marginLeft: 20,
    width: 70,
    textAlign: 'center'
  },
  numTicketsInfo: {
    marginLeft: 20
  },
  sendTxStatus: {
    height: 50,
    width: 150,
    marginLeft: 20
  },
  receiveTxStatus: {
    height: 50,
    // width: 150,
    marginLeft: 20,
    fontSize: 20
  },
  button: {
    marginLeft: 10
  },
  playerBettingInfo: {
    margin: 'auto',
    width: 260,
    height: 200,
    overflowY: 'scroll'
  },
  number: {
    fontSize: 15,
    float: 'left',
    textAlign: 'center',
    width: 18,
    height: 18,
    marginRight: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '50%',
    borderColor: '#708090',
    color: 'white',
    padding: 3
  }
};

const color = [
  '#FFD700',
  '#4169E1',
  '#DC143C',
  '#808080',
  '#32CD32'
];

const splitNumbers = (numbers) => {
  if (numbers.length % 2 == 1) numbers = '0' + numbers;
  return numbers.match(/.{1,2}/g).map(v => Number(v));
};

const aggregateBettingInfo = (array, numDrawn) => {
  const object = {};
  array.map((v, i) => {
    if (!object[v]) object[v] = 0;
    object[v] += 1;
    return null;
  });
  return object;
};

const generateRandomNumbers = (numDrawn, maxFigure) => {
  const newNumbers = [];
  while (newNumbers.length < numDrawn) {
    const newNumber = Math.floor((Math.random() * maxFigure) + 1);
    if (newNumbers.indexOf(newNumber) === -1) newNumbers.push(newNumber);
  }
  return newNumbers.sort((a, b) => a > b ? 1 : -1);
};

// const generateRandomNumbers = (numDrawn, maxFigure, weight) => {
//   const newNumbers = [];
//   while (newNumbers.length < numDrawn) {
//     const newNumber = Math.floor((Math.random() * maxFigure) + 1);
//     if (newNumbers.indexOf(newNumber) === -1) newNumbers.push(newNumber);
//   }
//   return [newNumbers.sort((a, b) => a > b ? 1 : -1), newNumbers.sort((a, b) => a > b ? 1 : -1).map(v => (v + weight) % (maxFigure + 1))];
// };

const mergeNumbers = (betNumbers) => {
  let mergedNumbers = 0;
  betNumbers.map((v, i) => {
    mergedNumbers += betNumbers[i] * Math.pow(100, i);
    return null;
  });
  return mergedNumbers;
};

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 0,
      networkName: '',
      accountAddress: '',
      accountBalance: 0,
      betNumbersList: [[]],
      numTickets: 1,
      numDrawn: 3,
      maxFigure: 10,
      currentGame: {},
      prevGame: {},
      prevGameId: 0,
      sendTxStatus: '',
      receiveTxStatus: '',
      currentGameWinnersDetail: {},
      prevGameWinnersDetail: {}
    };
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleSendTx = this.handleSendTx.bind(this);
    this.handleReceivePrize = this.handleReceivePrize.bind(this);
    this.handleChangePrevGameId = this.handleChangePrevGameId.bind(this);
    this.handleAddTicket = this.handleAddTicket.bind(this);
    this.handleClickRandom = this.handleClickRandom.bind(this);
    this.handleClickAllRandom = this.handleClickAllRandom.bind(this);
    this.updateGameInfo = this.updateGameInfo.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.language != this.props.language) return true;
    return true;
  }

  componentWillMount() {
    getEthData()
      .then(console.log)
      .catch(console.log);

    this.updateGameInfo();

    web3.eth.net.getId()
      .then((networkId) => {
        let networkName = '';
        switch (networkId) {
          case 1:
            networkName = 'Main';
            break;
          case 2:
            networkName = 'Morden';
            break;
          case 3:
            networkName = 'Ropsten';
            break;
          case 4:
            networkName = 'Rinkeby';
            break;
          case 42:
            networkName = 'Kovan';
            break;
          default:
            networkName = 'Unknown';
        }
        this.setState({
          networkId,
          networkName
        });
      });
  }

  updateGameInfo() {
    web3.eth.getAccounts()
      .then(addrs => this.setState({ accountAddress: addrs[0] }, () => Promise.resolve()))
      .then(() => web3.eth.getBalance(this.state.accountAddress))
      .then(value => this.setState({ accountBalance: web3.utils.fromWei(value, 'ether') }))
      .then(() => crypttoContract.methods.gameId().call())
      .then(gameId => crypttoContract.methods.getGameInfo(gameId).call({ from: this.state.accountAddress })
        .then(currentGame => this.setState({ currentGame, gameId, prevGameId: gameId > 0 ? gameId - 1 : 0, numDrawn: Number(currentGame._numDrawn), maxFigure: Number(currentGame._maxFigure) })))
      .then(() => crypttoContract.methods.getGameInfo(this.state.prevGameId).call({ from: this.state.accountAddress })
        .then(prevGame => this.setState({ prevGame })))
      .catch(console.error);
  }


  handleChangeNumber(e, row, col) {
    const value = Number(e.target.value);
    if (value >= 0) {
      if (value <= this.state.maxFigure) {
        const newBetNumbers = [...this.state.betNumbersList[row]];
        newBetNumbers[col] = value;
        const newBetNumbersList = [...this.state.betNumbersList];
        newBetNumbersList[row] = newBetNumbers;
        this.setState({
          betNumbersList: newBetNumbersList
        });
      }
    }
  }

  handleReceivePrize(gameId) {
    const from = this.state.accountAddress;
    crypttoContract.methods.receivePrize(gameId)
      .send({
        from,
        gas: 100000
      })
      .on('transactionHash', (hash) => {
        console.log(hash);
        this.setState({ receiveTxStatus: 'pending' });
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
        if (receipt.status === '0x0') this.setState({ receiveTxStatus: 'failed' });
        else if (receipt.status === '0x1') {
          this.setState({ receiveTxStatus: 'confirmed' });
          this.updateGameInfo();
        }
      })
      .on('error', (err, receipt) => {
        console.error(err, receipt);
        this.setState({ receiveTxStatus: 'error' });
      });
  }

  handleSendTx() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.state.numTickets; ++i) {
        for (let j = 0; j < this.state.numDrawn; ++j) {
          if (this.state.betNumbersList[i][j] <= 0 || this.state.betNumbersList[i][j] > this.state.maxFigure) return reject(`Numbers should be in 1 ~ ${this.state.maxFigure}.`);
          for (let k = j + 1; k < this.state.numDrawn; ++k) {
            if (this.state.betNumbersList[i][j] === this.state.betNumbersList[i][k]) return reject('Duplicate numbers are not allowed.');
          }
        }
      }
      return resolve();
    })
      .then(() => {
        const numTickets = this.state.numTickets;
        const from = this.state.accountAddress;
        const value = BigNumber(this.state.currentGame._ticketPrice).multiply(numTickets).toString();
        return crypttoContract.methods.purchaseTicket(this.state.betNumbersList.map(v => mergeNumbers(v.sort((a, b) => a > b ? 1 : -1))))
          .send({
            from,
            gas: 40000 + (60000 * numTickets),
            value
          })
          .on('transactionHash', (hash) => {
            console.log(hash);
            this.setState({ sendTxStatus: 'pending' });
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            console.log(confirmationNumber, receipt);
          })
          .on('receipt', (receipt) => {
            console.log(receipt);
            if (receipt.status === '0x0') this.setState({ sendTxStatus: 'failed' });
            else if (receipt.status === '0x1') {
              this.setState({ sendTxStatus: 'confirmed' });
              this.updateGameInfo();
            }
          })
          .on('error', (err, receipt) => {
            console.error(err, receipt);
            this.setState({ sendTxStatus: 'error' });
          });
      })
      .catch(msg => alert(msg));
  }

  handleAddTicket() {
    this.setState({
      numTickets: this.state.numTickets + 1,
      betNumbersList: [...this.state.betNumbersList, generateRandomNumbers(this.state.numDrawn, this.state.maxFigure)]
    }, () => console.log(this.state.betNumbersList));
  }

  handleChangePrevGameId(e, i, v) {
    this.setState({ prevGameId: v }, () => crypttoContract.methods.getGameInfo(this.state.prevGameId).call({ from: this.state.accountAddress })
      .then(prevGame => this.setState({ prevGame })));
  }

  handleClickRandom(row) {
    const newBetNumbersList = [...this.state.betNumbersList];
    newBetNumbersList[row] = generateRandomNumbers(this.state.numDrawn, this.state.maxFigure);
    this.setState({
      betNumbersList: newBetNumbersList
    });
  }

  handleClickDeleteTicket(row) {
    this.setState({
      betNumbersList: this.state.betNumbersList.filter((_, i) => i === row ? false : true),
      numTickets: this.state.numTickets - 1
    });
  }

  handleClickAllRandom() {
    this.setState({
      betNumbersList: Array(this.state.numTickets).fill(null).map(v => generateRandomNumbers(this.state.numDrawn, this.state.maxFigure))
    });
  }

  render() {
    const menuItems = [];
    for (let i = 0; i < this.state.gameId; ++i) {
      menuItems.push(<MenuItem key={i} value={i} primaryText={`${i}`} />);
    }

    const current_aggregateBettingInfo = this.state.currentGame._betNumbers ? aggregateBettingInfo(this.state.currentGame._betNumbers, this.state.currentGame._numDrawn) : {};
    const prev_aggregateBettingInfo = this.state.prevGame._betNumbers ? aggregateBettingInfo(this.state.prevGame._betNumbers, this.state.prevGame._numDrawn) : {};
    const isMatching = (betNumbers, winningNumbers) => {
      betNumbers.indexOf(winningNumbers) >= 0
    }
    return (
      <div style={styles.root}>

        <div style={styles.currentGameInfo}>
          <div style={{ margin: 15, fontSize: 25 }}>Current Game Info</div>
          <div>NumDrawn: {this.state.currentGame._numDrawn && this.state.currentGame._numDrawn}</div>
          <div>MaxFigure: {this.state.currentGame._maxFigure && this.state.currentGame._maxFigure}</div>
          <div>TicketPrice: {this.state.currentGame._ticketPrice && web3.utils.fromWei(BigNumber(this.state.currentGame._ticketPrice).toString(), 'ether')}eth</div>
          <div>NumSoldTickets: {this.state.currentGame._numSoldTickets}</div>
          <div>CumulativePrize: {this.state.currentGame._cumulativePrize && web3.utils.fromWei(BigNumber(this.state.currentGame._cumulativePrize).toString(), 'ether')}eth</div>
          <div>GameId: {this.state.currentGame._gameId}({this.state.currentGame._isActive && this.state.currentGame._isActive ? 'Active' : 'In-active'})</div>
          <div>StartAt: {this.state.currentGame._startAt && moment.unix(this.state.currentGame._startAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>ExpiredAt: {this.state.currentGame._expiredAt && moment.unix(this.state.currentGame._expiredAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>
            YourBetNumbers:
              <div>(You've bought {this.state.currentGame._betNumbers ? this.state.currentGame._betNumbers.length : (0)} tickets.)</div>
            <div style={{ ...styles.playerBettingInfo, height: 300 }}>
              {this.state.currentGame._betNumbers && Object.keys(current_aggregateBettingInfo).map((betNumbers, index1) =>
                <div key={index1} style={{ height: 35 }}>
                  <div style={{ float: 'left', marginRight: 10 }}>{index1 + 1}</div>
                  {splitNumbers(betNumbers).map((number, index2) => {
                    if (number === 0) return ('not drawn');
                    return (<div key={index2} style={{ ...styles.number, backgroundColor: color[Math.floor(number / 10)] }}>{number} </div>);
                  })}
                  <span style={{ float: 'left' }}>({current_aggregateBettingInfo[betNumbers]})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.contents}>
          <div style={styles.title}>Welcome to Cryptto</div>
          <div style={styles.networkInfo}>
            <div>Network: {this.state.networkName}</div>
            <div>Contract: {crypttoContract.options.address}</div>
          </div>
          <div style={styles.accountInfo}>
            <div>Account: {this.state.accountAddress}</div>
            <div>Balance: {this.state.accountBalance}eth</div>
          </div>
          <div style={styles.txForm}>
            <RaisedButton
              style={styles.button}
              label='ADD'
              onClick={this.handleAddTicket}
            />
            <RaisedButton
              style={styles.button}
              label='ALL RANDOM'
              onClick={this.handleClickAllRandom}
            />
            <RaisedButton
              style={styles.button}
              label='SEND'
              onClick={this.handleSendTx}
            />
            <span style={styles.numTicketsInfo}>{this.state.betNumbersList.length} tickets</span>
            <span> = {web3.utils.fromWei(BigNumber(this.state.betNumbersList.length * this.state.currentGame._ticketPrice).toString(), 'ether')}eth + feeForTx</span>
            <span style={styles.sendTxStatus}>{this.state.sendTxStatus}</span>
            <div style={{ textAlign: 'right', width: '80%' }}>*Numbers doesn't need to be ordered.</div>
            <div style={styles.ticketForm}>
              {Array(this.state.numTickets).fill(null).map((_, index1) => (
                <div key={index1}>
                  {Array(this.state.numDrawn).fill(null).map((_, index2) => (<TextField
                    key={index2}
                    style={styles.txTextField}
                    name={`betNumber_${index1}_${index2}`}
                    value={this.state.betNumbersList[index1][index2]}
                    onChange={e => this.handleChangeNumber(e, index1, index2)}
                  />))}
                  <RaisedButton
                    style={styles.button}
                    label='RANDOM'
                    onClick={() => this.handleClickRandom(index1)}
                  />
                  {this.state.numTickets > 1 ? <RaisedButton
                    style={styles.button}
                    label='DELETE'
                    onClick={() => this.handleClickDeleteTicket(index1)}
                  /> : (null)}
                </div>))}
            </div>
          </div>
        </div>



        <div style={styles.prevGameInfo}>
          <div style={{ fontSize: 25 }}>
            <span>Previous Game Info</span>
            <SelectField
              style={{ minWidth: 50, width: 100 }}
              value={this.state.prevGameId}
              onChange={this.handleChangePrevGameId}
            >
              {menuItems}
            </SelectField>
          </div>
          {this.state.prevGame._betNumbers && this.state.prevGame._betNumbers.indexOf(this.state.prevGame._winningNumbers) >= 0  ? (<div style={{ margin: 10 }}>
            <RaisedButton
              label="RECEIVE PRIZE"
              onClick={() => this.handleReceivePrize(this.state.prevGameId)}
            />
            <span style={styles.receiveTxStatus}>{this.state.receiveTxStatus}</span>
          </div>) : (null)}
          <div style={{ height: 60 }}>WinningNumbers: <div style={{ width: 200, margin: 'auto' }}>{this.state.prevGame._winningNumbers && splitNumbers(this.state.prevGame._winningNumbers).map((number, index2) => {
            if (number === 0) return ('not drawn');
            return (<div key={index2} style={{ ...styles.number,  backgroundColor: color[Math.floor(number / 10)] }}>{number} </div>);
          })}</div></div>
          <div>NumDrawn: {this.state.prevGame._numDrawn && this.state.prevGame._numDrawn}</div>
          <div>MaxFigure: {this.state.prevGame._maxFigure && this.state.prevGame._maxFigure}</div>
          <div>TicketPrice: {this.state.prevGame._ticketPrice && web3.utils.fromWei(BigNumber(this.state.prevGame._ticketPrice).toString(), 'ether')}eth</div>
          <div>NumSoldTickets: {this.state.prevGame._numSoldTickets}</div>
          <div>CumulativePrize: {this.state.prevGame._cumulativePrize && web3.utils.fromWei(BigNumber(this.state.prevGame._cumulativePrize).toString(), 'ether')}eth</div>
          <div>NumWinners: {this.state.prevGame._numWinners && this.state.prevGame._numWinners}</div>
          <div>PrizePerWinner: {this.state.prevGame._prizePerWinner && web3.utils.fromWei(BigNumber(this.state.prevGame._prizePerWinner).toString(), 'ether')}eth</div>
          <div>GameId: {this.state.prevGame._gameId}({this.state.prevGame._isActive && this.state.prevGame._isActive ? 'Active' : 'In-active'})</div>
          <div>StartAt: {this.state.prevGame._startAt && moment.unix(this.state.prevGame._startAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>ExpiredAt: {this.state.prevGame._expiredAt && moment.unix(this.state.prevGame._expiredAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>
            YourBetNumbers:
            <div>(You've bought {this.state.prevGame._betNumbers ? this.state.prevGame._betNumbers.length : (0)} tickets.</div>
            <div>{this.state.prevGame._betNumbers && this.state.prevGame._betNumbers.indexOf(this.state.prevGame._winningNumbers) >= 0 ?
              (<span>Congratulation! You won this game!)</span>) : (<span>No winning numbers for this game!)</span>)
            }</div>
            <div style={styles.playerBettingInfo}>
              {this.state.prevGame._betNumbers && Object.keys(prev_aggregateBettingInfo).map((betNumbers, index1) =>
                <div key={index1} style={{ height: 35 }}>
                  <div style={{ float: 'left', marginRight: 10 }}>{index1 + 1}</div>
                  {splitNumbers(betNumbers).map((number, index2) => {
                    if (number === 0) return ('not drawn');
                    return (<div key={index2} style={{ ...styles.number, backgroundColor: color[Math.floor(number / 10)] }}>{number} </div>);
                  })}
                  <span style={{ float: 'left' }}>({prev_aggregateBettingInfo[betNumbers]})</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Play;
