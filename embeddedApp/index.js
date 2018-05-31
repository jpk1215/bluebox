import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import configureStore from './store';
import styles from './styles.css';
import { 
	inputTyping, 
	findGallery,
	selectPhoto,
	deselectPhoto
} from './actions';

const store = configureStore();

class App extends Component {
	static propTypes = {
	  dispatch: PropTypes.func.isRequired,
	  gallery: PropTypes.shape({
	  	inputValue: PropTypes.string,
	  	photos: PropTypes.shape({}),
	  	selectedPhoto: PropTypes.string
	  }),
	};

	static defaultProps = {
	  gallery: {
	    inputValue: '',
	    photos: {},
	    selectedPhoto: '',
	  },
	}

	handleInput = e => {
	  this.props.dispatch(inputTyping(e.target.value));
	};

	handleButtonClick = () => {
		this.props.dispatch(findGallery(this.props.gallery.inputValue));
	};

	handleImageClick = photo => {
		console.log(photo);
		if(this.props.gallery.selectedPhoto === photo.id) {
			this.props.dispatch(deselectPhoto());
		} else {
			this.props.dispatch(selectPhoto(photo.id));
			window.parent.postMessage({
				...photo,
				origin: 'embedded-page'
			}, '*');
		}
	}

	render() {
		const images = this.props.gallery.photos && 
			this.props.gallery.photos.photo.map( (photo, index) => <img src={photo.url_t} onClick={ () => this.handleImageClick(photo)} key={index} />);


	  return (
		  <div>
		  	<div>
			  	<input onChange={this.handleInput} value={this.props.gallery.inputValue} />
			    <button onClick={this.handleButtonClick} className="btn btn-primary">Find Gallery</button>
		  	</div>
		    
		    <div style={{ width: '100%', height: '500px', margin: 'auto' }}>
			    <Carousel>
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