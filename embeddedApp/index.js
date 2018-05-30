import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import configureStore from './store';
import styles from './styles.css';
import { inputTyping } from './actions';

const store = configureStore();

class App extends Component {
	static proptypes = {
		dispatch: PropTypes.func.isRequired,
	};

	handleInput = (e) => {
		this.props.dispatch(inputTyping(e.target.value));
	};

	render() {
	  return (
  <div style={styles.centeredContainer} >
    <input onChange={handleInput} value={text} />
    <button onClick={handleClick} className="btn btn-primary" style={styles.btn}>Find Artist</button>
  </div>
  	);
	}
}


const mapStateToProps = state => ({
  artists: state.artists,
});

const ReduxApp = connect(mapStateToProps)(App);

render(<Provider store={store}>
  <ReduxApp />
       </Provider>, document.getElementById('app'));
