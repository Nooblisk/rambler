import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

const reduxState = {};

if (window.__REDUX_STATE__) {
	try {
		const plain = JSON.parse(unescape(__REDUX_STATE__));
		Object.keys(plain).forEach((key) => {
			reduxState[key] = Immutable.fromJS(plain[key]).merge(reduxState[key]);
		});
	} catch (e) {
	}
}

const store = configureStore(reduxState);

ReactDOM.render((
	<Provider store={store}>
		{createRoutes(browserHistory)}
	</Provider>
), document.getElementById('root'));
