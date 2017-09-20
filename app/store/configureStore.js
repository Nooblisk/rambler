import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import ajaxMiddleware from '../middleware/ajax';
import rootReducer from '../reducers';

const logger = createLogger({
	level: 'info',
	collapsed: false,
	logger: console,
	stateTransformer: (state) => {
		const newState = {};
		Object.keys(state).forEach((key) => {
			if (Immutable.Iterable.isIterable(state[key])) {
				newState[key] = state[key].toJS();
			} else {
				newState[key] = state[key];
			}
		});
		return newState;
	},
	predicate: (getState, action) => true,
});

const middlewares = [
	thunkMiddleware,
	ajaxMiddleware,
];

if (process.env.NODE_ENV !== `production`) {
	middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
