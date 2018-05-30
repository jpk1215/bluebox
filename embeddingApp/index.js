import React from 'react';
import { render } from 'react-dom';
import Iframe from 'react-iframe';
import styles from './styles.css';

const MainApp = () => (
  <div>
    <h1 className={styles.makeGreen}>Hello React!</h1>
    <img alt="tst" src="https://www.flickr.com/photos/nancyandwayne/3159793493/" />
    <Iframe
      url="/iframe"
      width="450px"
      height="450px"
      id="myId"
      className="myClassname"
      display="initial"
      position="relative"
      allowFullScreen
    />
  </div>
);


render(<MainApp />, document.getElementById('app'));
