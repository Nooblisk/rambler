import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BodyClassname from 'react-body-classname';

class FullscreenGallery extends Component {
	constructor(props) {
		super(props);
		this.handleCloseGallery = this.handleCloseGallery.bind(this);
		this.handleFitToScreen = this.handleFitToScreen.bind(this);

		this.state = {
			fitToScreen: false,
		};
	}

	render() {
		const {
			currentPhoto,
		} = this.props;

		const imageStyle = {
			backgroundImage: `url(${currentPhoto})`,
			backgroundSize: (this.state.fitToScreen ? 'contain' : null),
		};


		return (
			<BodyClassname className='no-scroll'>
				<div className='gallery-fullscreen'>
					<div className='full-screen-controls'>
						<span
							className='icon-clickable icon-greenyellow icon-shrink'
							onClick={this.handleFitToScreen}
						/>
						<span
							className='icon-clickable icon-greenyellow icon-cross icon-close'
							onClick={this.handleCloseGallery}
						/>
					</div>
					<div className='bgimage' style={imageStyle} />
				</div>
			</BodyClassname>
		);
	}

	handleCloseGallery(evt) {
		evt.preventDefault();

		if (this.props.onCloseGallery) {
			this.props.onCloseGallery(evt);
		}
	}

	handleFitToScreen(evt) {
		evt.preventDefault();

		this.setState({
			fitToScreen: !this.state.fitToScreen,
		});
	}
}

FullscreenGallery.propTypes = {
	currentPhoto: PropTypes.any,
	onCloseGallery: PropTypes.func,
};

export default FullscreenGallery;
