const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,    
    email: 'andrew@test.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId.toHexString(), access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'masha@test.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId.toHexString(), access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    _creator: userTwoId,
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateUsers = done => {
    User.deleteMany({})
        .then(() => {
            const userOne = new User(users[0]).save();
            const userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo]);
        })
        .then(() => done());
};

const populateTodos = done => {
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done());
};

module.exports = { users, todos, populateUsers, populateTodos };