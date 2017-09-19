import config from 'config';

export const GET_GALLERY = 'GET_GALLERY';
export const CLEAR_GALLERY = 'CLEAR_GALLERY';

const { BASE_URL } = config;

const getAuthorizationHeaders = () => ({
	Authorization: `Client-ID 5b45f3fd333af6f`,
});

export function getGallery() {
	console.log('getGallery dispatching!  = '); // TODO Remove
	return (dispatch) => {
		dispatch({
			ajaxAction: true,
			method: 'get',
			name: GET_GALLERY,
			url: `${BASE_URL}/3/gallery/top/top/`,
			headers: getAuthorizationHeaders(),
			payload: {},
			afterError: (data) => {
				console.log('error data = ', data);
			},
		});
	};
}
