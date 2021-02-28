import {AbstractComponent} from "../AbstractComponent";
import {HtmlUtils} from "../../utils/HtmlUtils";

/**
 * Component to add a TodoItem.
 */
export class AddTodoComponent extends AbstractComponent {

    public render(): AbstractComponent {
        const form = HtmlUtils.buildElement({name: 'form'});
        const div = HtmlUtils.buildElement({name: 'div', classes: "form-group"});
        const label = HtmlUtils.buildElement({name: 'label', text: 'Add a TODO item'});
        const input = HtmlUtils.buildElementInput({
            name: 'input',
            id: 'addTodoInput',
            classes: 'form-control',
            type: 'text',
            placeholder: 'TODO'
        }) as HTMLInputElement

        div.appendChild(label)
        div.appendChild(input)

        const addButton = HtmlUtils.buildElementButton({name: 'button', type: 'button', classes: 'btn btn-primary', text: 'Add'})
        addButton.onclick = ev => {
            this.properties.onAddTodoItem(input.value)
            input.value = ""
        }

        form.appendChild(div)
        form.appendChild(addButton)
        this.rootEl.appendChild(form);

        return this;
    }

    public buildRootElement(id?: string): HTMLElement {
        return HtmlUtils.buildElement({name: 'div', id: id})
    }
}
