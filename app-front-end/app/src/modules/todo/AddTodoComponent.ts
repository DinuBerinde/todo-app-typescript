import {AbstractComponent} from "../AbstractComponent";
import {HtmlUtils} from "../../utils/HtmlUtils";
import {Todo} from "../../App";
import {TodoComponent} from "./TodoComponent";

/**
 * Component to add a TodoItem.
 */
export class AddTodoComponent extends AbstractComponent {
    private readonly states = ["Inserito", "In elaborazione", 'Completato'];

    public render() {

        const containerInputTitle = HtmlUtils.buildInputComponent(
            'Title',
            'addTitle',
            '',
            100
        );

        const containerInputDescription = HtmlUtils.buildTextareaComponent(
            'Description',
            'addDescription',
            '',
            500
        );

        const containerState = HtmlUtils.buildSelectComponent(
            'State',
            'addState',
            this.states
        );

        const containerExpirationDate = HtmlUtils.buildDatepickerComponent(
            'Expiration Date',
            'addExpirationDate',
            new Date().toISOString().substring(0, 10)
        );

        this.rootEl.appendChild(containerInputTitle.container)
        this.rootEl.appendChild(containerInputDescription.container)
        this.rootEl.appendChild(containerState.container)
        this.rootEl.appendChild(containerExpirationDate.container)

        const divBtn =  HtmlUtils.buildElement({
            name: 'div',
            classes: 'form-group col-12'
        })
        const addButton = HtmlUtils.buildElementButton({
            name: 'button',
            type: 'button',
            classes: 'btn btn-primary',
            text: 'Add TODO',
            style: {
                width: '100%',
                marginTop: '16px'
            }
        })
        addButton.onclick = ev => {

            const todoItem: Todo = {
                id: '',
                title: containerInputTitle.component.value,
                description: containerInputDescription.component.value,
                state: containerState.component.value,
                expirationDate: containerExpirationDate.component.value
            }

            const errors = TodoComponent.validateTodoItem(todoItem);
            if(errors) {
                alert(errors);
                return;
            }

            this.properties.onAddTodoItem(todoItem);

            // reset models
            containerInputTitle.component.value = '';
            containerInputDescription.component.value = '';
            containerState.component.value = this.states[0];
            containerExpirationDate.component.value = new Date().toISOString().substring(0, 10);
        }
        divBtn.appendChild(addButton)

        this.rootEl.appendChild(divBtn)
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({
            name: 'div',
            classes: 'row',
            style: {
                marginBottom: '26px'
            }
        })
    }
}
