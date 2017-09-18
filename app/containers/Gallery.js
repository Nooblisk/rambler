import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchData from 'decorators/fetchData';

import {
	getGallery,
} from 'actions/app';

const fetchMethod = ({ store, params }) => store.dispatch(getGallery());

const actionMethod = () => {
};

class Gallery extends Component {
	render() {
		console.log('this.props.app.data = ', this.props.app.data); // TODO Remove
		return (
			<div>
				<p>privet ya gallery</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app.toJS(),
	};
}

Gallery.propTypes = {
	app: PropTypes.shape({
		data: PropTypes.any,
	}),
};
/* Apply FetchData Decorator */
const DecoratedGallery = fetchData(fetchMethod, actionMethod)(Gallery);

export default connect(mapStateToProps)(DecoratedGallery);
