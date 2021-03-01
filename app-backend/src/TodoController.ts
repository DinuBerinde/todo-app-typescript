import {Request, Response} from "express";

const generateID = () => {
    const min = Math.ceil(0);
    const max = Math.floor(9999);
    return "" + Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Initial todoItems
 */
const data: Array<TodoItem> = [
    {
        "id": generateID(),
        "description": "Fix bug Jira-12313"
    },
    {
        "id": generateID(),
        "description": "Meeting scheduled for tomorrow at 12:00"
    }
]

/**
 * Simple CRUD controller for the TodoItems.
 */
export class TodoController {

    public getTodos(req: Request, res: Response) {
        res.json(data);
    }

    public postTodo(req: Request, res: Response) {
        console.log(req.body)
        const todoItem = req.body;
        todoItem.id = generateID();
        data.push(todoItem);

        res.json(todoItem);
    }

    public patchTodo(req: Request, res: Response) {
        const todoItem = req.body as TodoItem;
        data.forEach(dataItem => {
            if (dataItem.id === todoItem.id) {
                dataItem.description = todoItem.description;
            }
        });

        res.status(200).end()
    }

    public deleteTodo(req: Request, res: Response) {
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
    description: string;
}