import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import fetchData from 'decorators/fetchData';

const fetchMethod = null;
const actionMethod = () => {
};

class App extends Component {
	render() {
		return (
			<div>
				<Helmet
					defaultTitle='Rambler&Co test exercise'
					titleTemplate='%s - Rambler&Co test exercise'
					meta={[{ name: 'description', content: 'Rambler&Co test exercise' }]}
					htmlAttributes={{ lang: 'en' }}
				/>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps() {
	return {};
}

App.propTypes = {
	children: PropTypes.any,
};
/* Apply FetchData Decorator */
const DecoratedApp = fetchData(fetchMethod, actionMethod)(App);

export default connect(mapStateToProps)(DecoratedApp);
