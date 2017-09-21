import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageCard from 'components/ImageCard';

import {
	getGallery,
} from 'actions/app';

const DATE_RANGE = 'day';

const prepareImages = (images) => {
	const preparedImages = [];
	images.forEach((image) => {
		if (image.type === 'image/jpeg' || image.type === 'image/png') {
			preparedImages.push({
				id: image.id,
				preview: image.link,
				alt: image.title,
			});
		} else if (image.type === 'image/gif') {
			preparedImages.push({
				id: image.id,
				preview: image.link,
				full: `http://i.imgur.com/${image.id}.gif`,
				alt: image.title,
			});
		} else if (image.cover) {
			preparedImages.push({
				id: image.id,
				preview: `https://imgur.com/${image.cover}b.jpg`,
				full: `https://imgur.com/${image.cover}.jpg`,
				alt: image.title,
			});
		}
	});
	return preparedImages;
};

class Gallery extends Component {
	static fetchData({ store }) {
		return store.dispatch(getGallery(DATE_RANGE));
	}

	// componentDidMount() {
	// 	this.props.getGallery(DATE_RANGE);
	// }

	render() {
		const { images } = this.props.app;
		if (!Array.isArray(images)) {
			return null;
		}
		const preparedImages = prepareImages(images);
		return (
			<div className='container'>
				<h1>{`Imgur top images of the ${DATE_RANGE}`}</h1>
				<div className='gallery'>
					{
						preparedImages.map(image => <ImageCard key={`ImageCard_${image.id}`} image={image} />)
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
