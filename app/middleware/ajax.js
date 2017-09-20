import superAgent from 'superagent';
import { camelizeKeys } from 'humps';

const sendRequest = ({ method, url, headers }) => new Promise((resolve, reject) => {
		const request = superAgent[method](url);
		Object.keys(headers).forEach((key) => {
			request.set(key, headers[key]);
		});
		// request.set('Authorization', 'Client-ID 5b45f3fd333af6f');
		request.end((err, res) => {
			if (err) {
				reject({ errorCode: err.status, errorMessage: err.statusText });
			} else {
				const resBody = camelizeKeys(res.body);
				resolve(resBody);
			}
		});
	});

export default ({ dispatch, getState }) => next => (action) => {
	if (!action.ajaxAction) {
		return next(action);
	}
	const type = action.name;
	return new Promise((resolve, reject) => {
		sendRequest({ method: action.method, url: action.url, headers: action.headers })
			.then(
				(data) => {
					action.payload = data;
					action.type = type;
					next(action);
					resolve();
				},
				(error) => {
					action.type = null;
					next(action);
					resolve();
				});
	});
};
