import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Gallery from 'containers/Gallery';

export const app = '/';

export default function (history) {
	return (
		<Router history={history}>
			<Route name='app' path={app} component={App}>
				<IndexRoute component={Gallery} />
			</Route>
		</Router>
	);
}

