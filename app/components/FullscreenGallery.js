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
				<div className='container-fluid hero'>
					<div className='gallery-overlay-header' />
					<div className='row'>
						<div className='gallery-fullscreen__wrapper'>
							<div className='gallery-fullscreen'>
								<div className='full-screen-controls'>
									<div className='full-screen-controls__wrapper'>
										<span className='icon-link clickable icon-greenyellow'>
											<span className='icon-shrink' onClick={this.handleFitToScreen} />
										</span>
										<span className='icon-link clickable icon-greenyellow' onClick={this.handleCloseGallery}>
											<span className='icon-cross icon-close' />
										</span>
									</div>
								</div>
								<div className='images-slider'>
									<div className='slick-list'>
										<div className='image-list-item'>
											<div
												className='bgimage'
												style={imageStyle}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
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
