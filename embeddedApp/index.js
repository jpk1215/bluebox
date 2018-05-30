import React from 'react';
import { render } from 'react-dom';
import styles from './styles.css';

const MainApp = () => (
  <h1 className={styles.makeBlue}>Hello React!</h1>
);


render(<MainApp />, document.getElementById('app'));
