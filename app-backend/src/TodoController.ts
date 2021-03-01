import {Request, Response} from "express";

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

    public async getTodos(req: Request, res: Response) {
        res.json(data);
    }

    public async postTodo(req: Request, res: Response) {
        const todoItem = req.body;
        todoItem.id = generateID();
        data.push(todoItem);

        res.json(todoItem);
    }

    public async patchTodo(req: Request, res: Response) {
        const todoItem = req.body as TodoItem;
        data.forEach(dataItem => {
            if (dataItem.id === todoItem.id) {
                dataItem.description = todoItem.description;
            }
        });

        res.status(200).end()
    }

    public async deleteTodo(req: Request, res: Response) {
        const id = req.params.id;
        data.forEach((dataItem, index) => {
            if (dataItem.id === id) {
                data.splice(index, 1);
            }
        })

        res.status(200).end()
    }
}

interface TodoItem {
    id: string;
    title: string;
    description: string;
    state: string;
    expirationDate: string;
}