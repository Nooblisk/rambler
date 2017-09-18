// import request from 'superagent';

function sendRequest({ method, url, headers }) {
	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200) {
					resolve(xhttp.responseText);
				} else {
					reject({ errorCode: xhttp.status, errorMessage: xhttp.statusText });
				}
			}
		};
		xhttp.open(method, url, true);
		Object.entries(headers).forEach(([key, value]) => {
			xhttp.setRequestHeader(key, value);
		});
		xhttp.send();
	});
}

export default ({ dispatch, getState }) => next => (action) => {
	if (!action.ajaxAction) {
		next(action);
		return null;
	}
	const copiedAction = { ...action };
	console.log('action = ', action); // TODO Remove
	sendRequest({ method: action.method, url: action.url, headers: action.headers })
		.then(
			(data) => {
				console.log('data = ', data); // TODO Remove
				copiedAction.payload = JSON.parse(data);
				copiedAction.type = action.name;
				next(copiedAction);
			},
			(error) => {
				if (copiedAction.afterError) {
					copiedAction.afterError(error);
				} else {
					console.error(error);
				}
			});
};
