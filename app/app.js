import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

const reduxState = {};
const izomorphicState = { initial: true };

if (window.__REDUX_STATE__) {
	try {
		const plain = JSON.parse(decodeURIComponent(__REDUX_STATE__));
		Object.entries(plain).forEach(([key, val]) => {
			reduxState[key] = Immutable.fromJS(val).merge(reduxState[key]);
		});
	} catch (e) {
	}
}

const store = configureStore(reduxState);

ReactDOM.render((
	<Provider store={store}>
		{createRoutes(browserHistory, izomorphicState)}
	</Provider>
), document.getElementById('root'), () => izomorphicState.initial = false);
