import Express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useRouterHistory, RouterContext, match } from 'react-router';
import { createMemoryHistory, useQueries } from 'history';
import compression from 'compression';
import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
// import config from './config.json';

const server = new Express();
// let portIndex = 0;
const port = 3040;
let scriptSrcs;
process.env.ON_SERVER = true;

let styleSrc;
if (process.env.NODE_ENV === 'production') {
	// let refManifest = require('../../rev-manifest.json')
	scriptSrcs = [
		'/vendor.js',
		'/app.js',
	];
	styleSrc = '/main.css';
} else {
	scriptSrcs = [
		'http://localhost:3002/static/vendor.js',
		// 'http://localhost:3002/static/dev.js',
		'http://localhost:3002/static/app.js',
	];
	styleSrc = 'http://localhost:3002/static/main.css';
}

server.use(compression());

if (process.env.NODE_ENV === 'production') {
	server.use(Express.static(path.join(__dirname, '../..', 'public')));
} else {
	server.use('/assets', Express.static(path.join(__dirname, '..', 'assets')));
	server.use(Express.static(path.join(__dirname, '../..', 'dist', 'public')));
}

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.get('*', (req, res, next) => {
	const history = useRouterHistory(useQueries(createMemoryHistory))();
	const store = configureStore();
	const routes = createRoutes(history);
	const location = history.createLocation(req.url);

	match({ routes, location }, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			res.redirect(301, redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			res.status(500).send(error.message);
		} else if (renderProps == null) {
			res.status(404).send('Not found');
		} else {
			const [getCurrentUrl, unsubscribe] = subscribeUrl();
			const reqUrl = location.pathname + location.search;

			getReduxPromise().then(() => {
				const reduxState = encodeURIComponent(JSON.stringify(store.getState()));
				const html = ReactDOMServer.renderToString(
					<Provider store={store}>
						{<RouterContext {...renderProps} />}
					</Provider>
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
				const { query, params } = renderProps;
				const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
				return comp.fetchData ?
					comp.fetchData({ query, params, store, history }) :
					Promise.resolve();
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
});

server.use((err, req, res, next) => {
	console.log(err.stack);
	// TODO report error here or do some further handlings
	res.status(500).send(`something went wrong...${err.toString()}`);
});


console.log(`Server is listening to port: ${port}`);
server.listen(port);

