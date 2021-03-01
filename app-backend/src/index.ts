import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {TodoController} from "./TodoController";

const todoController = new TodoController();
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/todos')
    .get(todoController.getTodos)
    .post(todoController.postTodo)
    .patch(todoController.patchTodo);

app.route('/todo/:id')
    .delete(todoController.deleteTodo)

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Server started at port: ' + port);