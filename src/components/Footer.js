import React from 'react';
import { crypttoAddress } from '../utils/contract/contract.cryptto';

const styles = {
};


class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div style={{ height: 100, width: '100%', backgroundColor: '#212121', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: 50, color: '#d5d8da', bottom: 0, position: 'fixed' }} >
        <div>Contract Address : {crypttoAddress}</div>
        <div>Copyright@2018 Cryptto. All Rights Reserved.</div>
      </div>
    );
  }
}

export default Footer;
