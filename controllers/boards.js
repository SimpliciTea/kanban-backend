'use strict';
const r = require('rethinkdb');


exports.create = (req, res, next) => {
	const { email } = req.body;
	const boardModel = require('../models/board');
	let board;

	// if the user has no boards,
	// use the demo board --
	// otherwise use the blank board
	r.table('users').get(email)('boardIds').count().eq(0).run(req._conn).then(isEmpty => {
		board = isEmpty ? boardModel.demo : boardModel.fresh;
		
		// insert new board into DB 
		r.table('boards').insert(board, { 
			returnChanges: true
		}).run(req._conn).then(result => {
			const board = result.changes[0].new_val;
			const { id } = board;

			// update user boardIds to include new board
			r.table('users').get(email).update(
				{ boardIds: r.row('boardIds').append(id) },
				{ returnChanges: true }
			).run(req._conn).then(result => {
				
				// return the new board to the client
				req._conn.close();
				res.json(board);
			})
		})
	}).catch(err => {
		console.log(err);
		req._conn.close();
		res.status(500).json(err);
	})
}

exports.read = (req, res, next) => {
	const { email } = req.body;

	// get the users boardIds
	r.table('users').get(email)('boardIds').run(req._conn).then(ids => {

		// if the user has no boards, create a board for them
		if (!ids.length) {
			return exports.create(req, res, next);
		}

		// get the boards by their ids
		r.table('boards').getAll(...ids).run(req._conn).then(cursor => {
			console.log(cursor);
			// return the boards to the client as json
			cursor.toArray().then(boards => {
				req._conn.close();
				res.json({ boards, ids });
			})
		})
	}).catch(err => {
		console.log(err);
		req._conn.close();
		res.status(500).json(err);
	})
}

exports.update = (req, res, next) => {
	let { board, board: { id } } = req.body;

	r.table('boards').get(id).update(board).run(req._conn).then(result => {
		console.log(result);
		req._conn.close();
		res.send('SUCCESS');
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	})
}

exports.destroy = (req, res, next) => {

}