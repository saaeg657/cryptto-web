import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { crypttoAddress } from '../utils/contract/contract.cryptto';

const styles = {
};


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'EN'
    };
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  componentWillMount() {

  }

  handleChangeLanguage(e, i, v) {
    this.setState({
      language: v
    }, () => this.props.setLanguage(v));
  }

  render() {
    return (
      <div style={{ height: 100, width: '100%', backgroundColor: '#212121', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: 30, color: '#d5d8da', bottom: 0, position: 'fixed' }} >
        <div style={{ width: '20%', height: '100%', float: 'left' }} />
        <div style={{ width: '60%', float: 'left' }}>
          <div>Contract Address : {crypttoAddress}</div>
          <div>Copyright@2018 Cryptto. All Rights Reserved.</div>
        </div>
        <div  style={{width: '20%', height: '100%', float: 'left' }}>
          <div style={{ margin: 20, float: 'left' }}>LANGUAGE</div>
          <SelectField
            value={this.state.language}
            onChange={this.handleChangeLanguage}
            style={{ minWidth: 50, width: 120, float: 'left', color: 'white' }}
            listStyle={{ backgroundColor: '#212121' }}
          >
            <MenuItem value='KR' primaryText={<div style={{ color: 'white', marginBottom: 5, backgroundColor: '#212121' }}>한국어</div>} />
            <MenuItem value='EN' primaryText={<div style={{ color: 'white', marginBottom: 5, backgroundColor: '#212121' }}>English</div>} />
          </SelectField>
        </div>
      </div>
    );
  }
}

export default Footer;
