const expect = require('expect');
const request  = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

var todos = [{
		_id : new ObjectID(),
		text : "First todo text" 
	}, 
	{
		_id : new ObjectID(),
		text : "Second todo text" 
	}];

beforeEach((done) => {
	Todo.remove({})
		.then(() => {
		return Todo.insertMany(todos);
		})
		.then(() => done());
});

describe('POST /todos', () => {
	it ('Should create a new todo', (done) => {
		var text = "Hello world !!";
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err)
					return done(err);
				Todo.find({ text }).then((res) => {
					expect(res.length).toBe(1);
					expect(res[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it ('Should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err)
					return done(err);
				Todo.find().then((res) => {
					expect(res.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe ("GET /todos", () => {
	it ("Should get all todos", (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.length).toBe(2);
			})
			.end(done);
	});
});

describe("GET /todos/:id", () => {
	it("Should get one todo", (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it ('Should return 404 if todo not found', (done) => {
		var idStr = new ObjectID().toHexString();
		request(app)
			.get(`/todos/${idStr}`)
			.expect(404)
			.end(done);
	});

	it ('Should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});


describe("DELETE /todos/:id", () => {
	it ('Should remove todo', (done) => {
		var idStr = todos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${idStr}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(idStr);
			})
			.end((err, res) => {
				if (err)
					done(err);
				Todo.findById(idStr).then((doc) => {
					expect(doc).toNotExist();
					done();
				}). catch((e) => done(e));
			});
	});

	it ('Should return 404 if todo not found', (done) => {
		var idStr = new ObjectID().toHexString();
		request(app)
			.delete(`/todos/${idStr}`)
			.expect(404)
			.end(done);
	});

	it ('Should return 404 if object id is invalid', (done) => {
		request(app)
			.delete(`/todos/123`)
			.expect(404)
			.end(done);
	});
});

describe ('PATCH /todos/:id', () => {
	it ('Should update the todo', (done) => {
		var idStr = todos[0]._id.toHexString();
		var txt = 'Hello world !!';
		request(app)
			.patch(`/todos/${idStr}`)
			.send({ text : txt , completed : true })
			.expect(200)
			.expect((res) => {
				var todoVar = res.body.todo;
				expect(todoVar._id).toBe(idStr);
				expect(todoVar.text).toBe(txt);
				expect(todoVar.completed).toBe(true);
				expect(todoVar.completedAt).toBeA('number');
			})
			.end(done);
	});

	it ('Should clear completedAt when todo is not completed', (done) => {
		var idStr = todos[1]._id.toHexString();
		var txt = 'Hello moon !!';
		request(app)
			.patch(`/todos/${idStr}`)
			.send({ text : txt, completed : false})
			.expect(200)
			.expect((res) => {
				var todoVar = res.body.todo;
				expect(todoVar._id).toBe(idStr);
				expect(todoVar.text).toBe(txt);
				expect(todoVar.completed).toBe(false);
				expect(todoVar.completedAt).toNotExist();
			})
			.end(done);
	});
});