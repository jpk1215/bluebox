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
		const { gallery } = this.props;
		const images = gallery.photos && 
			gallery.photos.photo.map( (photo, index) => <img src={photo.url_t} onClick={ () => this.handleImageClick(photo)} key={index} />);
		console.log(images);
	  return (
		  <div class='container-fluid'>
		  	<div class='row'>
		  		<div class='offset-md-3 col-md-6'>
				  	<div class='input-group m-3'>
				  		<input 
				  			type="text" 
				  			class='form-control'
				  			onChange={this.handleInput} 
				  			value={gallery.inputValue} 
				  			placeholder={'Gallery Id'} 
			  			/>
						  <div class="input-group-append">
						  	<button onClick={this.handleButtonClick} className="btn btn-outline-secondary" type="button">Find Gallery</button>
						  </div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="offset-md-2 col-md-8">
						{images &&
							<Carousel heightMode={'current'} initialSlideHeight={500} renderBottomCenterControls={false}>
							  {images}
					    </Carousel>
						}

						{gallery.loading &&
							<div class='alert alert-secondary' role='alert'>
						  	{'Loading...'}
							</div>
						}

				    {gallery.error && 
				    	<div class='alert alert-danger' role='alert'>
						  	{gallery.error}
							</div>
						}
					</div>
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
