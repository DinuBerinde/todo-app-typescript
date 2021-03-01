import {AbstractComponent} from "../AbstractComponent";
import {HtmlUtils} from "../../utils/HtmlUtils";
import {TodoComponent} from "./TodoComponent";
import {Todo} from "../../App";

/**
 * List component to display a list of TodoItems.
 */
export class ListTodoComponent extends AbstractComponent {

    public render() {
        if (this.properties.data) {
            this.properties.data.forEach(data => this.rootEl.appendChild(this.buildTodoComponent(data).getEl()))
        }
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({
            name: 'ul',
            classes: 'list-group',
            id: id,
            style: {
                marginTop: '20px'
            }
        })
    }

    private buildTodoComponent(data: Todo): TodoComponent {
        console.log(data)
        return new TodoComponent({
            parentEl: this.rootEl,
            id: data.id,
            data: data,
            onRemoveTodoItem: id => this.properties.onRemoveTodoItem(id),
            onUpdateTodoItem: (todo, id) => this.properties.onUpdateTodoItem(todo, id),
        })
    }

    /**
     * It add the TodoItem to the list.
     * @param dataItem the item
     */
    public addTodoItem(dataItem: Todo): void {
        this.rootEl.appendChild(this.buildTodoComponent(dataItem).getEl());
    }

    /**
     * It updates a TodoItem.
     * @param todoItem the todoItem
     * @param id the id of the item
     */
    public updateTodoItem(todoItem: Todo, id: string): void {
        this.rootEl.replaceChild(this.buildTodoComponent(todoItem).getEl(), this.rootEl.children.namedItem(id));
    }

    /**
     * It removes a TodoItem.
     * @param id the id of the item
     */
    public removeTodoItem(id: string) {
        this.rootEl.children.namedItem(id).remove();
    }

    /**
     * It removes all TodoItems.
     */
    public removeAll() {
        while (this.rootEl.firstChild) {
            this.rootEl.removeChild(this.rootEl.firstChild);
        }
    }
}
