import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageCard from 'components/ImageCard';

import {
	getGallery,
} from 'actions/app';

const DATE_RANGE = 'day';

class Gallery extends Component {
	static fetchData({ store }) {
		return store.dispatch(getGallery(DATE_RANGE));
	}

	// componentDidMount() {
	// 	this.props.getGallery(DATE_RANGE);
	// }

	render() {
		console.log('this.props.app.images = ', this.props.app.images); // TODO Remove
		const { images } = this.props.app;
		const filteredImages = images.filter(image => image.type !== undefined);
		return (
			<div>
				<h1>{`Imgur top images of the ${DATE_RANGE}`}</h1>
				<div className='gallery'>
					{
						filteredImages.map(image => <ImageCard key={`ImageCard_${image.id}`} image={image} />)
					}
				</div>
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
