import React from 'react';

const styles = {
  contents: {
    width: '30%',
    margin: 'auto',
    marginTop: 150,
  },
  img: {
    height: 500
  }
}

class Contact extends React.Component {
  render() {
    return (
      <div style={styles.contents}>
        <h1>ssaeg657@gmail.com</h1>
        {/* <img src='https://cdn.mirror.wiki/http://www.dsb.kr/data/chinesehansi/1228643372-22.jpg' style={styles.img} />
        <h1>Developer : Kim Jong-deok, the Kuyam<a href="http://cafe.daum.net/kuyam"> (http://cafe.daum.net/kuyam) </a></h1> */}
      </div>
    );
  }
}

export default Contact;
