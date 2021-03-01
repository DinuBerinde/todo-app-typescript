import {IncomingMessage, ServerResponse} from "http";


/**
 * It generates a unique ID.
 */
const generateID = () => {
    const min = Math.ceil(0);
    const max = Math.floor(9999999);
    return "" + Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Initial todoItems
 */
const data: Array<TodoItem> = [
    {
        id: generateID(),
        title: "Fix bug ",
        description: "fix bug Jira-12313 ...",
        state: 'Inserito',
        expirationDate: '2021-03-01'
    },
    {
        id: generateID(),
        title: "Meeting tomorrow ",
        description: "Meeting scheduled for tomorrow at 12:00",
        state: 'Inserito',
        expirationDate: '2021-03-02'
    }
]

/**
 * Simple CRUD controller for the TodoItems.
 */
export class TodoController {
    private readonly headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
    };

    public async getTodos(req: IncomingMessage, res: ServerResponse) {
        this.wrapExceptions(req, res, () => {
            res.writeHead(200, this.headers);
            res.end(JSON.stringify(data));
        })
    }

    /**
     * It adds a TodoItem the the list.
     * @param req the request
     * @param res the response
     */
    public async postTodo(req: IncomingMessage, res: ServerResponse) {
        this.wrapExceptions(req, res, () => {
            let body = ''

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const todoItem = JSON.parse(body);
                todoItem.id = generateID();
                data.push(todoItem);

                res.writeHead(200, this.headers);
                res.end(JSON.stringify(todoItem));
            });
        })
    }

    /**
     * It updates a TodoItem.
     * @param req the request
     * @param res the response
     */
    public async patchTodo(req: IncomingMessage, res: ServerResponse) {
        this.wrapExceptions(req, res, () => {
            let body = ''

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const todoItem = JSON.parse(body);
                data.forEach(dataItem => {
                    if (dataItem.id === todoItem.id) {
                        dataItem.description = todoItem.description;
                    }
                });

                res.writeHead(200, this.headers);
                res.end();
            });
        })
    }

    /**
     * It deletes a TodoItem.
     * @param req the request
     * @param res the response
     */
    public async deleteTodo(req: IncomingMessage, res: ServerResponse) {
        this.wrapExceptions(req, res, () => {
            const todoItemId = req.url?.substring(req.url?.lastIndexOf("/") + 1)
            if (todoItemId) {
                data.forEach((dataItem, index) => {
                    if (dataItem.id === todoItemId) {
                        data.splice(index, 1)
                    }
                });
                res.writeHead(200, this.headers);
            } else {
                res.writeHead(500, this.headers);
            }

            res.end();
        })
    }

    /**
     * It wraps the exceptions of a function that will be invoked.
     * @param req the request
     * @param res the response
     * @param func the function to be invoked
     * @private
     */
    private wrapExceptions(req: IncomingMessage, res: ServerResponse, func: () => void) {
        try {
            func();
        } catch (error) {
            res.writeHead(500, this.headers);
            res.end();
        }
    }
}

interface TodoItem {
    id: string;
    title: string;
    description: string;
    state: string;
    expirationDate: string;
}