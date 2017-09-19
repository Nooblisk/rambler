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
		console.log('this.state = ', this.state); // TODO Remove
		const ImageCardStyle = {
			width: `${280}px`,
			height: `${280}px`,
		};
		console.log('image = ', image); // TODO Remove
		return (
			<div >
				<img
					style={ImageCardStyle}
					src={image.link}
					alt={image.title}
					onClick={this.handleClick}
				/>
				{
					this.state.showFull &&
					<FullscreenGallery
						currentPhoto={image.link}
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

