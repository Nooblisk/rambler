import React from 'react';
import { PropTypes as Type } from 'prop-types';

export default (fetch, action) => {

	return DecoratedComponent => (

		class FetchDataDecorator extends React.Component {

			static fetchData = fetch;

			static propTypes = {
				store: Type.shape({
					dispatch: Type.func
				}),

				location: Type.object,
				params: Type.object,
				initialRender: Type.bool,
			};

			static contextTypes = {
				router: Type.object,
			};

			componentDidMount() {
				if (this.props.initialRender) {
					return;
				}

				action({ props: this.props, context: this.context });
			}

			render() {
				return (
					<DecoratedComponent {...this.props} />
				);
			}
		}
	);
}
