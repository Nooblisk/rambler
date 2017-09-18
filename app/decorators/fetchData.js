import React from 'react';
import { PropTypes as Type } from 'react';

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

			componentDidMount() {
				action({ props: this.props });
			}

			render() {
				return (
					<DecoratedComponent {...this.props} />
				);
			}
		}
	);
}
