import config from 'config';

export const GET_GALLERY = 'GET_GALLERY';
export const CLEAR_GALLERY = 'CLEAR_GALLERY';

const { BASE_URL } = config;

const getAuthorizationHeaders = () => ({
	Authorization: `Client-ID 5b45f3fd333af6f`,
});

export function getGallery(dateRange) {
	return {
		ajaxAction: true,
		method: 'get',
		name: GET_GALLERY,
		url: `${BASE_URL}/3/gallery/top/top/${dateRange}`,
		headers: getAuthorizationHeaders(),
		payload: {},
	};
}

