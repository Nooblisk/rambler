import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ImageCard extends Component {
	render() {
		const { image } = this.props;

		console.log('image = ', image); // TODO Remove
		return (
			<div>
				<img src={image.link} alt={image.title} />
			</div>
		);
	}
}


ImageCard.propTypes = {};

export default ImageCard;

