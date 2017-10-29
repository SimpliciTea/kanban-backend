const express = require('express'),
			http = require('http'),
			bodyParser = require('body-parser'),
			cors = require('cors'),
			morgan = require('morgan'),
			r = require('rethinkdb'),
			socketIO = require('socket.io'),
			config = require('./config'),
			router = require('./router');

const app = express();


/* MIDDLEWARE */
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
router(app);


/* SERVER */
const server = http.createServer(app);
const port = config.express.port || 3000; 
const io = socketIO(server);

server.listen(port, () => {
	console.log(`Server up and listening on port ${port}`);
})
