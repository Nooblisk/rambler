import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageCard from 'components/ImageCard';

import {
	getGallery,
} from 'actions/app';

class Gallery extends Component {
	static fetchData({ store }) {
		return store.dispatch(getGallery());
	}
	// componentDidMount() {
	// 	this.props.getGallery();
	// }

	render() {
		console.log('this.props.app.images = ', this.props.app.images); // TODO Remove
		const { images } = this.props.app;
		return (
			<div>
				<p>privet ya gallery</p>
				{
					images.map(image => <ImageCard key={`ImageCard_${image.id}`} image={image} />)
				}
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
		images: PropTypes.any,
	}),
	getGallery: PropTypes.func,
};

export default connect(mapStateToProps, {
	getGallery,
})(Gallery);
