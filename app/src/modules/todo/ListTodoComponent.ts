import {AbstractComponent} from "../AbstractComponent";
import {HtmlUtils} from "../../utils/HtmlUtils";
import {TodoComponent} from "./TodoComponent";
import {Todo} from "../../App";

/**
 * List component to display a list of TodoItems.
 */
export class ListTodoComponent extends AbstractComponent {

    public render(): AbstractComponent {
        if (this.properties.data) {
            this.properties.data.forEach(data => this.rootEl.appendChild(this.buildTodoComponent(data).getEl()))
        }

        return this;
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
        return new TodoComponent({
            parentEl: this.rootEl,
            id: data.id,
            data: data,
            onRemoveTodoItem: id => this.properties.onRemoveTodoItem(id),
            onUpdateTodoItem: (todo, id, newDescription) => this.properties.onUpdateTodoItem(todo, id, newDescription),
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
     * It remove a TodoItem.
     * @param id the id of the item
     */
    public removeTodoItem(id: string) {
        this.rootEl.children.namedItem(id).remove();
    }
}