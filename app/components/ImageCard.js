import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullscreenGallery from 'components/FullscreenGallery';

class ImageCard extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.onCloseGallery = this.onCloseGallery.bind(this);
		this.state = {
			showFull: false,
		};
	}

	onCloseGallery() {
		this.setState({
			showFull: false,
		});
	}

	handleClick() {
		this.setState({
			showFull: true,
		});
	}

	render() {
		const { image } = this.props;
		const full = image.full || image.preview;

		const imageStyle = {
			backgroundImage: `url(${image.preview})`,
			/* Make the background image cover the area of the <div>, and clip the excess */
			backgroundSize: 'cover',
		};

		return (
			<div className='image-card'>
				<div
					className='image'
					style={imageStyle}
					onClick={this.handleClick}
				/>
				{
					this.state.showFull &&
					<FullscreenGallery
						currentPhoto={full}
						onCloseGallery={this.onCloseGallery}
					/>
				}
			</div>
		);
	}
}

ImageCard.propTypes = {
	image: PropTypes.object,
};

export default ImageCard;

