const expect = require('expect');
const request  = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

var todos = [{ text : "First todo text" }, { text : "Second todo text" }];

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