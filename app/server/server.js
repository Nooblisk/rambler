import Express from 'express';
import path from 'path';
import compression from 'compression';
import universalRenderer from './middleware/universalRenderer';

const server = new Express();
const port = process.env.PORT || 3040;
process.env.ON_SERVER = true;

server.use(compression());

if (process.env.NODE_ENV === 'production') {
	server.use(Express.static(path.join(__dirname, '../..', 'public')));
} else {
	server.use('/assets', Express.static(path.join(__dirname, '..', 'assets')));
	server.use(Express.static(path.join(__dirname, '../..', 'dist', 'public')));
}

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.get('*', (req, res, next) => {
	universalRenderer(req, res, next);
});

server.use((err, req, res, next) => {
	console.log(err.stack);
	// TODO report error here or do some further handlings
	res.status(500).send(`something went wrong...${err.toString()}`);
});


console.log(`Server is listening to port: ${port}`);
server.listen(port);

