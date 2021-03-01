import {AbstractComponent} from "./modules/AbstractComponent";
import {AddTodoComponent} from "./modules/todo/AddTodoComponent";
import {HtmlUtils} from "./utils/HtmlUtils";
import {ListTodoComponent} from "./modules/todo/ListTodoComponent";
import {TodoService} from "./services/TodoService";

// app div element
const appEl = document.getElementById("app") as HTMLElement;
appEl.classList.add("container")

/**
 * The items data
 */
const data: Array<Todo> = []

/**
 * the crud service
 */
const todoService = new TodoService();

class App extends AbstractComponent {
    private listTodoComponent: ListTodoComponent;

    public async onPreRender(): Promise<void> {
        const items = await todoService.get();
        data.push(...items)
    }

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
            data: data,
            onRemoveTodoItem: id => this.onRemoveTodoItem(id),
            onUpdateTodoItem: (todo, id, newDescription) => this.onUpdateTodoItem(todo, id, newDescription),
        });

        this.rootEl.appendChild(divTitle)
        this.rootEl.appendChild(addTodoComponent.getEl());
        this.rootEl.appendChild(this.listTodoComponent.getEl());
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({
            name: 'div',
            id: id,
            style: {
                marginTop: '20px'
            }
        })
    }


    /**
     * It add a new TodoItem.
     * @param itemTodo the description of the TodoItem
     */
    public onAddTodoItem(itemTodo: string) {
        todoService.post({
            id: '',
            description: itemTodo
        }).then(res => {
            data.push(res)
            this.listTodoComponent.addTodoItem(data[data.length - 1]);
        })
    }

    /**
     * It updates a TodoItem.
     * @param todoItem the TodoItem that gets updated
     * @param id: the id of the item
     * @param newDescription the new description of the TodoItem
     */
    public onUpdateTodoItem(todoItem: Todo, id: string, newDescription: string) {
        todoItem.description = newDescription;
        todoService.patch(todoItem).then(res => {
            this.listTodoComponent.updateTodoItem(todoItem, id);
        })
    }

    /**
     * It removes a TodoItem.
     * @param id the id of the item
     */
    public onRemoveTodoItem(id: string) {
        todoService.delete(id).then(res => {
            data.forEach((dataItem, index) => {
                if (dataItem.id === id) {
                    data.splice(index, 1);
                }
            })
            this.listTodoComponent.removeTodoItem(id);
        })
    }
}


/**
 * The TodoItem model.
 */
export interface Todo {
    id: string;
    description: string;
}

// render app
new App({parentEl: appEl});
