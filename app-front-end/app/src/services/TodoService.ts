import axios from 'axios';
import {Todo} from "../App";

/**
 * CRUD service class.
 */
export class TodoService {

    /**
     * It returns all TodoItems.
     */
    public async get(): Promise<Array<Todo>> {
        try {
            const response = await axios.get('http://localhost:3000/todos');
            return response.data
        } catch (e) {
            console.error(e)
            alert('Error fetching data')
            Promise.reject();
        }
    }

    /**
     * It add a new TodoItem.
     * @param todoItem the todoItem
     */
    public async post(todoItem: Todo): Promise<Todo> {
        try {
            const response = await axios.post(
                "http://localhost:3000/todos",
                todoItem
            );
            return response.data;
        } catch (e) {
            console.error(e)
            alert('Error posting data')
            Promise.reject();
        }
    }

    /**
     * It updates a TodoItem.
     * @param todoItem the todoItem to be updated
     */
    public async patch(todoItem: Todo): Promise<Todo> {
        try {
            const response = await axios.patch(
                "http://localhost:3000/todos",
                todoItem
            );
            return response.data;
        } catch (e) {
            console.error(e)
            alert('Error updating data')
            Promise.reject();
        }
    }

    /**
     * It removes a TodoItem.
     * @param id the id of the TodoItem
     */
    public async delete(id: string): Promise<Todo> {
        try {
            const response = await axios.delete("http://localhost:3000/todo/" + id);
            return response.data;
        } catch (e) {
            console.error(e)
            alert('Error deleting data')
            Promise.reject();
        }
    }

}
