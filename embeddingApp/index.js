import React, { Component } from 'react';
import { render } from 'react-dom';
import Iframe from 'react-iframe';


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
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <h1 className="text-center">Flickr Gallery Viewer</h1>
            <Iframe
              url="/iframe"
              width="100%"
              height="700px"
              display="initial"
              className="shadow-lg p-3 mb-5 bg-white rounded"
              position="relative"
              allowFullScreen
            />
            <pre>{this.state.selectedPhoto &&
              JSON.stringify(this.state.selectedPhoto, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}


render(<MainApp />, document.getElementById('app'));
