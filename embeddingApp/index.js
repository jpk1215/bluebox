import React, { Component } from 'react';
import { render } from 'react-dom';
import Iframe from 'react-iframe';
import styles from './styles.css';


class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: null,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data: photo }) => {
    if (photo.origin === 'embedded-page') {
      const { selectedPhoto } = this.state;

      if (selectedPhoto && selectedPhoto.id === photo.id) {
        this.setState({ selectedPhoto: null });
      } else {
        this.setState({ selectedPhoto: photo });
      }
    }
  }

  render() {
    return (
      <div>
        <h1 className={styles.makeGreen}>Hello React!</h1>
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
        <pre>{this.state.selectedPhoto && JSON.stringify(this.state.selectedPhoto, null, 2)}</pre>
      </div>
    );
  }
}


render(<MainApp />, document.getElementById('app'));
