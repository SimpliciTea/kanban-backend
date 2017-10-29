'use strict';
const r = require('rethinkdb');


exports.create = (req, res, next) => {
	const { email } = req.body;
	const freshBoard = require('../models/board');

	// insert new board into DB
	r.table('boards').insert(freshBoard, { 
		returnChanges: true
	}).run(req._conn).then(result => {
		const board = result.changes[0].new_val;
		const { id } = board;

		// update user boardIds to include new board
		r.table('users').get(email).update(
			{ boardIds: r.row('boardIds').append(id) },
			{ returnChanges: true }
		).run(req._conn).then((asdf) => {
			
			// return the new board to the client
			req._conn.close();
			res.json(board);
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	})
}

exports.read = (req, res, next) => {
	const { email } = req.body;

	// get the users boardIds
	r.table('users').get(email)('boardIds').run(req._conn).then(ids => {

		// get the boards by their ids
		r.table('boards').getAll(...ids).run(req._conn).then(cursor => {
			
			// return the boards to the client as json
			cursor.toArray().then(boards => {
				req._conn.close();
				res.json(boards);
			})
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	})
}

exports.update = (req, res, next) => {

}

exports.destroy = (req, res, next) => {

}