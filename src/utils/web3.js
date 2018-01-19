import Web3 from 'web3';
import { crypttoAddress, crypttoAbi } from './contract/contract.cryptto';

var web3 = null;
if(typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3();
}

const crypttoContract = new web3.eth.Contract(crypttoAbi, crypttoAddress);

export {
  web3,
  crypttoContract
};
