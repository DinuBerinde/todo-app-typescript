import {AbstractComponent} from "./modules/AbstractComponent";
import {AddTodoComponent} from "./modules/todo/AddTodoComponent";
import {HtmlUtils} from "./utils/HtmlUtils";
import {ListTodoComponent} from "./modules/todo/ListTodoComponent";
import {TodoService} from "./services/TodoService";

// app div element
const appEl = document.getElementById("app") as HTMLElement;
appEl.classList.add("container")


/**
 * App component class.
 */
class App extends AbstractComponent {
    private listTodoComponent: ListTodoComponent;

    /**
     * the crud service
     */
    private readonly todoService = new TodoService();

    /**
     * The items data
     */
    private readonly data: Array<Todo> = [];


    public render() {

        const divTitle = HtmlUtils.buildElement({
            name: 'div',
            text: 'TODO APP',
            style: {
                textAlign: 'center',
                fontSize: '25px',
                marginBottom: '46px'
            }
        })

        const addTodoComponent = new AddTodoComponent({
            onAddTodoItem: item => this.onAddTodoItem(item),
            parentEl: this.rootEl,
            id: 'addTodo'
        });

        this.listTodoComponent = new ListTodoComponent({
            parentEl: this.rootEl,
            id: 'listTodo',
            data: this.data,
            onRemoveTodoItem: id => this.onRemoveTodoItem(id),
            onUpdateTodoItem: (todo, id) => this.onUpdateTodoItem(todo, id),
        });

        const titleTodos = HtmlUtils.buildElement({
           name: 'h5',
           text: 'TODOS'
        });

        this.rootEl.appendChild(divTitle)
        this.rootEl.appendChild(addTodoComponent.getEl());
        this.rootEl.appendChild(titleTodos);
        this.rootEl.appendChild(this.listTodoComponent.getEl());

        this.getTodoItems();
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({
            name: 'div',
            id: id,
            style: {
                marginTop: '20px',
                paddingBottom: '40px'
            }
        })
    }

    /**
     * It fetches the TodoItems.
     */
    public getTodoItems(): void {
        (async () => {
            const items = await this.todoService.get();
            this.data.splice(0, this.data.length);
            this.data.push(...items)

            this.listTodoComponent.removeAll();
            this.listTodoComponent.render();
        })();
    }

    /**
     * It adds a new TodoItem.
     * @param todoItem the TodoItem
     */
    public onAddTodoItem(todoItem: Todo) {
        (async () => {

            const newTodoItem = await this.todoService.post(todoItem);

            this.data.push(newTodoItem);
            this.listTodoComponent.addTodoItem(this.data[this.data.length - 1]);
        })();
    }

    /**
     * It updates a TodoItem.
     * @param todoItem the TodoItem that gets updated
     * @param id: the id of the item
     */
    public onUpdateTodoItem(todoItem: Todo, id: string) {
        (async () => {
            await this.todoService.patch(todoItem);
            this.listTodoComponent.updateTodoItem(todoItem, id);
        })();
    }

    /**
     * It removes a TodoItem.
     * @param id the id of the item
     */
    public onRemoveTodoItem(id: string) {
        (async () => {
            await this.todoService.delete(id);
            this.getTodoItems();
        })();
    }
}


/**
 * The TodoItem model.
 */
export interface Todo {
    id: string;
    title: string;
    description: string;
    state: string;
    expirationDate: string;
}

// render app
new App({parentEl: appEl}).getEl();
