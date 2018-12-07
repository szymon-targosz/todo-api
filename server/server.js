const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT || 3013;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then(todos => {
            res.send({ todos });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', (req, res) => { 
    const id = req.params.id

    if (!ObjectID.isValid(id)) { 
        return res.status(404).send();
    }

    Todo.findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo }); 
        })
        .catch(err => {
            res.status(400).send(); 
        });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id)
        .then(todo => { // zwraca usuniete todo
            if (!todo) {  // jesli nic nie usunie to zwroci null (czyli nie ma tam todo o tym id bo nie usunelo)
                return res.status(404).send();
            }

            res.send({ todo });
        })
        .catch(err => {
            res.send(400).send();
        });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}.`);
});


module.exports = { app };