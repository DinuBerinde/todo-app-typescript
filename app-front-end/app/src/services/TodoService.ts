import axios from 'axios';
import {Todo} from "../App";

/**
 * CRUD service class.
 */
export class TodoService {

    public async get(): Promise<Array<Todo>> {
        try {
            const response = await axios.get('http://localhost:3000/todos');
            return response.data
        } catch (e) {
            console.error(e)
            alert('Error fetching data')
            return null
        }
    }

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
            return null
        }
    }

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
            return null
        }
    }

    public async delete(id: string): Promise<Todo> {
        try {
            const response = await axios.delete("http://localhost:3000/todo/" + id);
            return response.data;
        } catch (e) {
            console.error(e)
            alert('Error deleting data')
            return null
        }
    }

}
