import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import r from 'rethinkdb'
import socketIO from 'socket.io'
import config from './config'
import router from './router'

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
	type Query {
		hello: String
	}
`)

const root = {
	hello: () => 'Hello world!',
}

const app = express();

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}))

app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')


/* MIDDLEWARE */
// app.use(morgan('combined'));
// app.use(cors());
// app.use(bodyParser.json({ type: '*/*' }));
// router(app);


/* SERVER */
// const server = http.createServer(app);
// const port = config.express.port || 3000; 
// const io = socketIO(server);
// 
// server.listen(port, () => {
	// console.log(`Server up and listening on port ${port}`);
// })
