import React from 'react';
import BigNumber from 'big-number';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton'
import { web3, crypttoContract } from '../../utils/web3';
import { FlatButton } from 'material-ui';


const styles = {
  contents: {
    width: '95%',
    margin: 'auto',
    marginBottom: 200
  },
  number: {
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
    padding: 3,
    fontSize: 15
  },
  dialogContent: {
    width: 300,
    heigth: 500,
    overflowY: 'scroll'
  },
  headerColumn: {
    fontSize: 8
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
  if (numbers.length % 2 === 1) numbers = '0' + numbers;
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

class GameHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: '',
      items: [],
      openBetNumberListDialog: false,
      betNumbers: [],
      numDrawn: 1,
    };
    this.handleReceivePrize = this.handleReceivePrize.bind(this);
  }

  componentWillMount() {
    web3.eth.getAccounts()
      .then(addrs => this.setState({ accountAddress: addrs[0] }, () => Promise.resolve()))
      .then(() => web3.eth.getBalance(this.state.accountAddress))
      .then(() => crypttoContract.methods.gameId().call())
      .then(gameId =>
        Promise.all(Array(Number(gameId) + 1).fill(null).map((_, i) =>
          crypttoContract.methods.getGameInfo(gameId - i).call({ from: this.state.accountAddress })
        )))
      .then(result => this.setState({ items: result }));
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
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('error', (err, receipt) => {
        console.error(err, receipt);
      });
  }

  render() {
    const betNumbersList = () => {
      const prev_aggregateBettingInfo = aggregateBettingInfo(this.state.betNumbers, this.state.numDrawn);
      const actions = [
        <FlatButton
          label='close'
          onClick={() => this.setState({ openBetNumberListDialog: false })}
        />
      ]
      return (
        <Dialog
          title='Bet Numbers List'
          open={this.state.openBetNumberListDialog}
          onRequestClose={() => this.setState({ openBetNumberListDialog: false })}
          actions={actions}
          contentStyle={styles.dialogContent}
          bodyStyle={{ overflowY: 'scroll' }}
        >
          <div>
            {this.state.betNumbers && Object.keys(prev_aggregateBettingInfo).map((betNumbers, index1) =>
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
        </Dialog>
      )
    }
    return (
      <div style={styles.contents}>
        <h1>Game History</h1>
        {betNumbersList()}
        <Table
          selectable={false}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow style={{ backgroundColor: '#f1f1f1' }}>
              <TableHeaderColumn colSpan={1} style={styles.headerColumn}>Period</TableHeaderColumn>
              <TableHeaderColumn colSpan={1} style={styles.headerColumn}># of balls</TableHeaderColumn>
              <TableHeaderColumn colSpan={1} style={styles.headerColumn}>Max Figure</TableHeaderColumn>
              <TableHeaderColumn colSpan={4} style={styles.headerColumn}>Winning Numbers</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>Total Prize</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}># of Winners</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>Prize per Winner</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}># of soldTickets</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>Start Time</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>Expiring Time</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>IsActive</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>Bet Numbers</TableHeaderColumn>
              <TableHeaderColumn colSpan={2} style={styles.headerColumn}>Win?</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.items && this.state.items.map((gameInfo, index) => {
              return (
                <TableRow key={index}>
                  <TableRowColumn colSpan={1} style={styles.headerColumn}>{gameInfo._gameId}</TableRowColumn>
                  <TableRowColumn colSpan={1} style={styles.headerColumn}>{gameInfo._numDrawn}</TableRowColumn>
                  <TableRowColumn colSpan={1} style={styles.headerColumn}>{gameInfo._maxFigure}</TableRowColumn>
                  <TableRowColumn colSpan={4} style={styles.headerColumn}>
                    {splitNumbers(gameInfo._winningNumbers).map((number, index2) => {
                      if (number === 0) return ('not drawn');
                      return (<div key={index2} style={{ ...styles.number, backgroundColor: color[Math.floor(number / 10)] }}>{number} </div>);
                    })}
                  </TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{web3.utils.fromWei(BigNumber(gameInfo._cumulativePrize).toString(), 'ether')}eth</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{gameInfo._numWinners}</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{web3.utils.fromWei(BigNumber(gameInfo._prizePerWinner).toString(), 'ether')}eth</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{gameInfo._numSoldTickets}</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{moment.unix(gameInfo._startAt).format('YYYY/MM/DD HH:mm:ss')}</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{moment.unix(gameInfo._expiredAt).format('YYYY/MM/DD HH:mm:ss')}</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>{gameInfo._isActive ? 'true' : 'false'}</TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}><RaisedButton label='show' style={{ minWidth: 50, width: 70 }} labelStyle={{ fontSize: 12 }} onClick={() => this.setState({ openBetNumberListDialog: true, betNumbers: gameInfo._betNumbers, numDrawn: gameInfo._numDrawn })} /></TableRowColumn>
                  <TableRowColumn colSpan={2} style={styles.headerColumn}>
                    {gameInfo._betNumbers.indexOf(gameInfo._winningNumbers) >= 0 ?
                      (<RaisedButton label='Win!(Receive)' labelStyle={{ fontSize: 12 }} onClick={() => this.handleReceivePrize(gameInfo._gameId)} />) : (<span>fail</span>)}
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default GameHistory;
