import React, { Component } from 'react';

import styles from './Greeter.css';


class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}>
        Hello World
      </div>
    );
  }
}

export default Greeter;
