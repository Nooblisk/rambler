import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useRouterHistory, RouterContext, match } from 'react-router';
import { createMemoryHistory, useQueries } from 'history';
import Promise from 'bluebird';
import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

let scriptSrcs;

let styleSrc;
if (process.env.NODE_ENV === 'production') {
	scriptSrcs = [
		'/vendor.js',
		'/app.js',
	];
	styleSrc = '/main.css';
} else {
	scriptSrcs = [
		'http://localhost:3002/static/vendor.js',
		'http://localhost:3002/static/app.js',
	];
	styleSrc = 'http://localhost:3002/static/main.css';
}

const universalRenderer = (req, res, next) => {
	const history = useRouterHistory(useQueries(createMemoryHistory))();
	const store = configureStore();
	const routes = createRoutes(history);
	const location = history.createLocation(req.url);

	match({ routes, location }, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			res.redirect(301, redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			res.status(500).send(error.message);
		} else if (renderProps === null) {
			res.status(404).send('Not found');
		} else {
			const [getCurrentUrl, unsubscribe] = subscribeUrl();
			const reqUrl = location.pathname + location.search;

			// const getReduxPromise = () => {
			// 	const { query, params } = renderProps;
			// 	const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
			// 	console.log('comp = ', comp); // TODO Remove
			// 	// console.log('comp.fetchData!==null = ', comp.fetchData!==null); // TODO Remove
			// 	const promise = (comp.fetchData !== null) ?
			// 		comp.fetchData({ query, params, store, history }) :
			// 		Promise.resolve();
			// 	console.log('promise = ', promise); // TODO Remove
			// 	return promise;
			// };

			getReduxPromise()
				.then(() => {
					const reduxState = encodeURIComponent(JSON.stringify(store.getState()));
					const html = ReactDOMServer.renderToString(
						<Provider store={store}>
							{<RouterContext {...renderProps} />}
						</Provider>,
					);
					const metaHeader = Helmet.renderStatic();

					if (getCurrentUrl() === reqUrl) {
						res.render('index', { metaHeader, html, scriptSrcs, reduxState, styleSrc });
					} else {
						res.redirect(302, getCurrentUrl());
					}
					unsubscribe();
				})
				.catch((err) => {
					Helmet.renderStatic();
					unsubscribe();
					next(err);
				});
			function getReduxPromise() {
				const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

				const promise = (comp.fetchData!==null) ?
					comp.fetchData({ store }) :
					Promise.resolve();
				console.log('promise in universalRenderer = ', promise); // TODO Remove
				return promise;
			}
		}
	});

	function subscribeUrl() {
		let currentUrl = location.pathname + location.search;
		const unsubscribe = history.listen((newLoc) => {
			if (newLoc.action === 'PUSH' || newLoc.action === 'REPLACE') {
				currentUrl = newLoc.pathname + newLoc.search;
			}
		});
		return [
			() => currentUrl,
			unsubscribe,
		];
	}
};

export default universalRenderer;

