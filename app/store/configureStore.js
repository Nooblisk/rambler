import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import ajaxMiddleware from '../middleware/ajax';
import rootReducer from '../reducers';

const middlewares = [
	thunkMiddleware,
	ajaxMiddleware,
];

if (process.env.NODE_ENV !== `production`) {
	middlewares.push(createLogger({
		level: 'info',
		collapsed: false,
		logger: console,
		stateTransformer: (state) => {
			const newState = {};

			for (const i of Object.keys(state)) {
				if (Immutable.Iterable.isIterable(state[i])) {
					newState[i] = state[i].toJS();
				} else {
					newState[i] = state[i];
				}
			}

			return newState;
		},
		predicate: (getState, action) => true,
	}));
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
