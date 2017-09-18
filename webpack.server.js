const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = 3002;

new WebpackDevServer(webpack(config), {}).listen(port, 'localhost', (err) => {
	if (err) {
		console.log(err);
	}

	console.log(`Webpack dev server is listening at localhost:${port}`);
});
