import {AbstractComponent} from "../AbstractComponent";
import {HtmlUtils} from "../../utils/HtmlUtils";
import {Todo} from "../../App";

/**
 * TodoItem component to perform a CRUD.
 */
export class TodoComponent extends AbstractComponent {


    public render() {
        // container description
        const divContainerDescription = this.buildContainerDescription();

        // to remove a TodoItem
        const buttonRemove = HtmlUtils.buildElementButton({
            name: 'button',
            classes: 'btn btn-danger',
            type: 'button',
            text: 'Remove',
            style: {
                float: 'right',
                marginTop: '16px'
            }
        });
        buttonRemove.onclick = ev => this.properties.onRemoveTodoItem(this.properties.id)

        // to update a TodoItem
        const buttonEdit = HtmlUtils.buildElementButton({
            name: 'button',
            classes: 'btn btn-primary',
            type: 'button',
            text: 'Edit',
            style: {
                float: 'right',
                marginRight: '20px',
                marginTop: '16px'
            }
        });
        buttonEdit.onclick = ev => {
            buttonRemove.style.display = 'none'
            buttonEdit.style.display = 'none'
            divContainerDescription.style.display = 'none'
            divContainerEdit.style.display = ''
        }

        // edit container
        const divContainerEdit = this.buildContainerEdit(buttonRemove, buttonEdit, divContainerDescription);

        this.rootEl.appendChild(divContainerDescription)
        this.rootEl.appendChild(divContainerEdit)
        this.rootEl.appendChild(buttonRemove)
        this.rootEl.appendChild(buttonEdit)
    }


    private buildContainerEdit(buttonRemove: HTMLElement, buttonEdit: HTMLElement, divContainerDescription: HTMLElement): HTMLElement {
        const divContainerEdit = HtmlUtils.buildElement({
            name: 'div',
            classes: 'row',
            style: {
                display: 'none'
            }
        })

        const containerInputTitle = HtmlUtils.buildInputComponent(
            'Title',
            'title' + this.properties.data.id,
            this.properties.data.title,
            100
        );
        containerInputTitle.component.maxlength = '100'

        const containerInputDescription = HtmlUtils.buildTextareaComponent(
            'Description',
            'description' + this.properties.data.id,
            this.properties.data.description,
            500
        );

        const containerState = HtmlUtils.buildSelectComponent(
            'State',
            'state' + this.properties.data.id,
            ["Inserito", "In elaborazione", 'Completato'],
            this.properties.data.state
        );

        const containerExpirationDate = HtmlUtils.buildDatepickerComponent(
            'Expiration Date',
            'expiration' + this.properties.data.id,
            this.properties.data.expirationDate
        );

        // to confirm the update of a TodoItem
        const buttonConfirm = HtmlUtils.buildElementButton({
            name: 'button',
            classes: 'btn btn-success',
            type: 'button',
            text: 'Confirm',
            style: {
                float: 'right',
                marginTop: '16px',
                marginRight: '20px'
            }
        });
        buttonConfirm.onclick = ev => {

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

            this.properties.onUpdateTodoItem(todoItem, this.properties.id)

            // hide/show views
            divContainerEdit.style.display = 'none'
            buttonRemove.style.display = ''
            divContainerDescription.style.display = ''
            buttonEdit.style.display = ''
        }

        // cancel item editing
        const buttonCancelEdit = HtmlUtils.buildElementButton({
            name: 'button',
            classes: 'btn btn-primary',
            type: 'button',
            text: 'Cancel',
            style: {
                float: 'right',
                marginTop: '16px'
            }
        });
        buttonCancelEdit.onclick = ev => {
            // hide/show views
            divContainerEdit.style.display = 'none'
            buttonRemove.style.display = ''
            divContainerDescription.style.display = ''
            buttonEdit.style.display = ''
        }


        const divBtns = HtmlUtils.buildElement({
            name: 'div',
            classes: 'col-12',
        })
        divBtns.appendChild(buttonCancelEdit)
        divBtns.appendChild(buttonConfirm)

        divContainerEdit.appendChild(containerInputTitle.container)
        divContainerEdit.appendChild(containerInputDescription.container)
        divContainerEdit.appendChild(containerState.container)
        divContainerEdit.appendChild(containerExpirationDate.container)
        divContainerEdit.appendChild(divBtns)

        return divContainerEdit;
    }

    private buildContainerDescription(): HTMLElement {
        const divContainerDescription = HtmlUtils.buildElement({
            name: 'div',
            classes: 'row'
        })

        const divTitle = HtmlUtils.buildElement({
            name: 'div',
            text: this.properties.data.title,
            classes: 'col-8',
            style: {
                fontSize: '18px',
                fontWeight: 'bold'
            }
        })

        const spanDescription = HtmlUtils.buildElement({
            name: 'span',
            text: this.properties.data.state,
            classes: 'badge badge-secondary',
            style: {
                padding: '6px'
            }
        })

        const spanExpiration = HtmlUtils.buildElement({
            name: 'span',
            text: this.properties.data.expirationDate,
            classes: 'badge badge-info',
            style: {
                padding: '6px',
                marginRight: '16px'
            }
        })

        const divState = HtmlUtils.buildElement({
            name: 'div',
            classes: 'col-4',
            style: {
                textAlign: 'right'
            }
        })

        divState.appendChild(spanExpiration)
        divState.appendChild(spanDescription)

        const divDescription = HtmlUtils.buildElement({
            name: 'div',
            text: this.properties.data.description,
            classes: 'col-12'
        })


        divContainerDescription.appendChild(divTitle);
        divContainerDescription.appendChild(divState);
        divContainerDescription.appendChild(divDescription);

        return divContainerDescription;
    }

    public static validateTodoItem(todoItem: Todo) {
        let errors = '';

        if (!todoItem.title) {
            errors += "Titolo obbligatorio\n"
        }

        if (!todoItem.description) {
            errors += "Descrizione obbligatoria\n"
        }

        if (!todoItem.state) {
            errors += "Stato obbligatorio\n"
        }

        if (!todoItem.expirationDate) {
            errors += "Data obbligatoria\n"
        }

        if (errors) {
            return errors
        }

        return null
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({name: 'li', classes: 'list-group-item', id: id})
    }
}
