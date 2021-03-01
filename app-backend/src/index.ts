import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import {TodoController} from "./TodoController";

const todoController = new TodoController();

const server = http.createServer(async (request: IncomingMessage, response: ServerResponse) => {

    if (request.method === 'OPTIONS') {
        response.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PATCH, DELETE",
            'Access-Control-Allow-Headers': 'Content-Type, Accept'
        });
        response.end();
        return;
    }

    if (request.url === '/todos') {

        if (request.method === 'GET') {
            await todoController.getTodos(request, response)

        } else if (request.method === 'POST') {
            await todoController.postTodo(request, response)

        } else if (request.method === 'PATCH') {
            await todoController.patchTodo(request, response)

        } else {
            response.writeHead(404);
            response.end();
        }

    } else if (request.method === 'DELETE' && request.url?.startsWith('/todo/')) {
        await todoController.deleteTodo(request, response)

    } else {
        response.writeHead(404);
        response.end();
    }
});

const port = 3000;
server.listen(port);

console.log('Server started on port: ' + port);