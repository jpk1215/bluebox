import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import configureStore from './store';
import styles from './styles.css';
import { inputTyping, findGallery } from './actions';

const store = configureStore();

class App extends Component {
	static propTypes = {
	  dispatch: PropTypes.func.isRequired,
	  handleInput: PropTypes.func.isRequired,
	  handleClick: PropTypes.func.isRequired,
	  gallery: PropTypes.shape({
	  	inputValue: PropTypes.string,
	  	photos: PropTypes.shape({}),
	  }),
	};

	static defaultProps = {
	  gallery: {
	    inputValue: '',
	    photos: {}
	  },
	}

	handleInput = (e) => {
	  this.props.dispatch(inputTyping(e.target.value));
	};

	handleClick = e => {
		this.props.dispatch(findGallery(this.props.gallery.inputValue));
	};

	render() {
		console.log(this.props.gallery.photos);
		const images = this.props.gallery.photos && this.props.gallery.photos.photo.map(photo => <img src={photo.url_t} />);
	  return (
  <div style={styles.centeredContainer} >
  	<div>
	  	<input onChange={this.handleInput} value={this.props.gallery.inputValue} />
	    <button onClick={this.handleClick} className="btn btn-primary">Find Gallery</button>
  	</div>
    
    <div style={{ width: '50%', margin: 'auto' }}>
	    <Carousel initialSlideHeight={200} initialSlideWidth={200}>
	    	{images}
	    </Carousel>
    </div>
  </div>
  	);
	}
}


const mapStateToProps = state => ({
  gallery: state.gallery,
});

const ReduxApp = connect(mapStateToProps)(App);


render(
	<Provider store={store}>
  	<ReduxApp />
	{/* eslint-disable-next-line no-undef */}
	</Provider>, document.getElementById('app'));
