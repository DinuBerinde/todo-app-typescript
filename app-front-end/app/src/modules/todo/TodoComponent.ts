import {AbstractComponent} from "../AbstractComponent";
import {HtmlUtils} from "../../utils/HtmlUtils";

/**
 * TodoItem component to perform a CRUD.
 */
export class TodoComponent extends AbstractComponent {

    public render() {

        const divDescription = HtmlUtils.buildElement({
            name: 'div',
            text: this.properties.data.description
        })

        // to remove a TodoItem
        const buttonRemove = HtmlUtils.buildElementButton({
            name: 'button',
            classes: 'btn btn-danger',
            type: 'button',
            text: 'Remove',
            style: {
                float: 'right'
            }
        });
        buttonRemove.onclick = ev => this.properties.onRemoveTodoItem(this.properties.id)

        // to show the UI in order to update a TodoItem
        const buttonEdit = HtmlUtils.buildElementButton({
            name: 'button',
            classes: 'btn btn-info',
            type: 'button',
            text: 'Edit',
            style: {
                float: 'right',
                marginRight: '20px'
            }
        });
        buttonEdit.onclick = ev => {
            buttonRemove.style.display = 'none'
            buttonEdit.style.display = 'none'
            divDescription.style.display = 'none'
            divEdit.style.display = ''
        }


        // edit div
        const divEdit = HtmlUtils.buildElement({name: 'div', style: {display: 'none'}})

        const input = HtmlUtils.buildElementInput({
            name: 'input',
            id: 'editTodoInput' + this.properties.data.id,
            classes: 'form-control',
            type: 'text',
            text: this.properties.data.description
        }) as HTMLInputElement

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
            const newDescription = input.value
            this.properties.onUpdateTodoItem(this.properties.data, this.properties.id, newDescription)

            divEdit.style.display = 'none'
            buttonRemove.style.display = ''
            divDescription.style.display = ''
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
            divEdit.style.display = 'none'
            buttonRemove.style.display = ''
            divDescription.style.display = ''
            buttonEdit.style.display = ''
        }

        divEdit.appendChild(input)
        divEdit.appendChild(buttonCancelEdit)
        divEdit.appendChild(buttonConfirm)

        this.rootEl.appendChild(divDescription)
        this.rootEl.appendChild(divEdit)
        this.rootEl.appendChild(buttonRemove)
        this.rootEl.appendChild(buttonEdit)
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({name: 'li', classes: 'list-group-item', id: id})
    }
}
