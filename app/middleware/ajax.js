// import fetch from 'isomorphic-fetch';
import superAgent from 'superagent'
import { camelizeKeys } from 'humps'
// import BluebirdPromise from 'bluebird';

// import { Promise } from 'es6-promise';

// function sendRequest({ method, url, headers }) {
// 	return new Promise((resolve, reject) => {
// 		const isomorphicFetch = fetch(url, {
// 			method,
// 			headers,
// 		});
// 		console.log('isomorphicFetch = ', isomorphicFetch); // TODO Remove
// 		isomorphicFetch.then((response) => {
// 			console.log('fetch get response! = '); // TODO Remove
// 			if (response.status === 200) {
// 				resolve(response.json());
// 			} else {
// 				reject({ errorCode: response.json().status, errorMessage: response.json().statusText });
// 			}
// 		}).catch((error) => {
// 			console.log(`There has been a problem with your fetch operation: ${error.message}`);
// 		});
// 	});
// }

function sendRequest({ method, url, headers }) {
	return new Promise((resolve, reject) => {

		const request = superAgent[method](url);
		request.set('Authorization', 'Client-ID 5b45f3fd333af6f');
		request.end((err, res) => {
				if (err) {
					// console.log('err = ', err); // TODO Remove
					reject({ errorCode: err.status, errorMessage: err.statusText });
				} else {
					const resBody = camelizeKeys(res.body);
					resolve(resBody);
				}
			});
	});

	// const isomorphicFetch = fetch(url, {
	// 	method,
	// 	headers,
	// });
	// console.log('isomorphicFetch = ', isomorphicFetch); // TODO Remove
	// isomorphicFetch.then((response) => {
	// 	console.log('fetch get response! = '); // TODO Remove
	// 	if (response.status === 200) {
	// 		resolve(response.json());
	// 	} else {
	// 		reject({ errorCode: response.json().status, errorMessage: response.json().statusText });
	// 	}
	// }).catch((error) => {
	// 	console.log(`There has been a problem with your fetch operation: ${error.message}`);
	// });
	// });
}

export default ({ dispatch, getState }) => next => (action) => {
	if (!action.ajaxAction) {
		next(action);
		return null;
	}
	const copiedAction = { ...action };
	// console.log('action = ', action); // TODO Remove
	// const def = BluebirdPromise.defer();
	return new Promise((resolve, reject) => {
		sendRequest({ method: action.method, url: action.url, headers: action.headers })
			.then(
				(data) => {
					console.log('ya sdelal resolve! = '); // TODO Remove
					// console.log('data after resolve = ', data); // TODO Remove
					copiedAction.payload = data;
					copiedAction.type = action.name;
					next(copiedAction);
					resolve();
				},
				(error) => {
					console.log('ya sdelal reject = '); // TODO Remove
					if (copiedAction.afterError) {
						copiedAction.afterError(error);
					} else {
						console.error(error);
					}
					next(copiedAction);
					resolve();
				});
	});
	// return def.promise;
};
