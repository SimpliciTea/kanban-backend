const r = require('rethinkdb');
const config = require('./config');

const DATABASE = config.rdb.db || 'kanban';
const TABLES = [{ 
	name: 'users',
	opts: {
		primaryKey: 'email'
	}
}, {
	name: 'boards'
}];

exports.init = () => {
	r.connect(config.rdb).then(conn => {
		console.log('Initializing RethinkDB...');

		return createDb(conn)
			.then(() => Promise.all(TABLES.map(table => createTable(conn, table))))
			.then(() => {
				console.log('RethinkDB Initialized... closing connection');
				conn.close();
		});
	})
};

exports.reset = () => {
	r.connect(config.rdb).then(conn => {
		r._conn = conn;
		console.log('Droping database: ', DATABASE);

		r.dbDrop(DATABASE).run(conn).then(result => {
			return true;
		}).then(() => {
			r._conn.close();
			return exports.init();
		})
	})
}

exports.connect = (req) => {
	r.connect(config.rdb.db).then(conn => {
		req._conn = conn;
		return conn;
	})
}

const createDb = conn =>  {
	return r.dbList().run(conn).then((databases) => {
		if (databases.includes(DATABASE)) {
			console.log('Database already exists: ', DATABASE);
			return Promise.resolve(true);
		} else {
			console.log('Creating database: ', DATABASE);
			return r.dbCreate(DATABASE).run(conn);
		}
	});
}

const createTable = (conn, table) => {
	return r.db(DATABASE).tableList().run(conn).then(tables => {
		if (tables.includes(table)) {
			console.log('Table already exists: ', table);
			return Promise.resolve(true);
		} else {
			console.log('Creating table: ', table);
			let opts = { ...table.opts };

			return r.db(DATABASE).tableCreate(table.name, opts).run(conn);
		}
	})
}