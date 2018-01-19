import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AppBar } from 'material-ui';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  appBar: {
    backgroundColor: '#212121'
  },
  item: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    color: '#d5d8da'
  },
  title: {
    textDecoration: 'none',
    color: '#d5d8da',
    cursor: 'pointer'
  },
  navLink: {
    textDecoration: 'none',
    color: '#d5d8da'
  },
  drawer: {
    backgroundColor: '#3b3b3b',
    width: 250
  },
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickTitle = this.handleClickTitle.bind(this);
  }


  handleClickTitle() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
          <AppBar
            title={'CRYPTTO'}
            onTitleClick={this.handleClickTitle}
            style={styles.appBar}
            titleStyle={styles.title}
            showMenuIconButton={false}
          >
            <NavLink to='/play' style={styles.navLink}><MenuItem style={styles.item}>Play</MenuItem></NavLink>
            <NavLink to='/about' style={styles.navLink}><MenuItem style={styles.item}>About</MenuItem></NavLink>
            <NavLink to='/howtoplay' style={styles.navLink}><MenuItem style={styles.item}>How to Play</MenuItem></NavLink>
            <NavLink to='/gamehistory' style={styles.navLink}><MenuItem style={styles.item}>Game History</MenuItem></NavLink>
            <NavLink to='/smartcontract' style={styles.navLink}><MenuItem style={styles.item}>Smart Contract</MenuItem></NavLink>
            <NavLink to='/contact' style={styles.navLink}><MenuItem style={styles.item}>Contact Us</MenuItem></NavLink>
            <NavLink to='/question' style={styles.navLink}><MenuItem style={styles.item}>{"Q&A"}</MenuItem></NavLink>
          </AppBar>
          
        
      </div>
    );
  }
}

export default withRouter(Navbar);
