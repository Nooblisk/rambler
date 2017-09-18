import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Gallery from 'containers/Gallery';

export const app = '/';

// export const gallery = '/gallery';


function prepareComponent(izomorphicState, Component, props) {
	return (<Component
		initialRender={izomorphicState.initial}
		{...props}
	/>);
}


export default function (history, izomorphicState) {
	return (
		<Router history={history} createElement={prepareComponent.bind(this, izomorphicState)}>
			<Route name='app' path={app} component={App}>
				<IndexRoute component={Gallery} />
			</Route>
		</Router>
	);
}

