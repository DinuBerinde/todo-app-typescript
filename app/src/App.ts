import {AbstractComponent} from "./modules/AbstractComponent";
import {AddTodoComponent} from "./modules/todo/AddTodoComponent";
import {HtmlUtils} from "./utils/HtmlUtils";
import {ListTodoComponent} from "./modules/todo/ListTodoComponent";

// app div element
const appEl = document.getElementById("app") as HTMLElement;
appEl.classList.add("container")


/**
 * It generates an id.
 * @return the generated id
 */
const generateID = () => {
    const min = Math.ceil(0);
    const max = Math.floor(9999);
    return "" + Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * The todoItems data
 */
const data: Array<Todo> = [
    {
        "id": generateID(),
        "description": "Fix bug Jira-12313"
    },
    {
        "id": generateID(),
        "description": "Meeting scheduled for tomorrow at 12:00"
    }
]

class App extends AbstractComponent {
    private listTodoComponent: ListTodoComponent;

    public render(): AbstractComponent {

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

        return this;
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
        data.push({
            id: generateID(),
            description: itemTodo
        });
        this.listTodoComponent.addTodoItem(data[data.length - 1]);
    }

    /**
     * It updates a TodoItem.
     * @param todoItem the TodoItem that gets updated
     * @param id: the id of the item
     * @param newDescription the new description of the TodoItem
     */
    public onUpdateTodoItem(todoItem: Todo, id: string, newDescription: string) {
        todoItem.description = newDescription;
        this.listTodoComponent.updateTodoItem(todoItem, id);
    }

    /**
     * It removes a TodoItem.
     * @param id the id of the item
     */
    public onRemoveTodoItem(id: string) {
        data.forEach((dataItem, index) => {
            if (dataItem.id === id) {
                data.splice(index, 1);
            }
        })
        this.listTodoComponent.removeTodoItem(id);
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
