/**
 * HTML helper class to build HTML elements.
 */
export class HtmlUtils {

    static buildElement(options: HtmlOptions): HTMLElement {
        const el = document.createElement(options.name) as HTMLElement

        if (options.id) {
            el.id = options.id;
        }

        if (options.text) {
            el.innerText = options.text;
        }

        if (options.style) {
            for (const property in options.style) {
                el.style[property] = options.style[property]
            }
        }

        if (options.classes) {
            if (options.classes.indexOf(" ") > 0) {
                el.classList.add(...options.classes.split(" "));
            } else {
                el.classList.add(options.classes);
            }
        }

        return el
    }

    static buildElementInput(options: HtmlOptions): HTMLElement {
        const el = HtmlUtils.buildElement(options) as HTMLInputElement
        if (options.type) {
            el.type = options.type
        }

        if (options.placeholder) {
            el.placeholder = options.placeholder
        }

        if (options.text) {
            el.value = options.text
        }

        return el
    }

    static buildElementButton(options: HtmlOptions): HTMLElement {
        const el = HtmlUtils.buildElement(options) as HTMLButtonElement
        if (options.type) {
            el.type = options.type
        }

        return el
    }

    private static buildInternalInputComponent(type: string, labelTxt: string, inputId: string, inputValue: string, maxLength?: number): HtmlComponent {
        const divContainer = HtmlUtils.buildElement({
            name: 'div',
            classes: 'form-group col-12'
        })

        const label = HtmlUtils.buildElement({
            name: 'label',
            text: labelTxt,
            style: {
                fontWeight: 'bold'
            }
        });

        const input = HtmlUtils.buildElementInput({
            name: type,
            id: 'edit' + inputId,
            classes: 'form-control',
            type: type === 'textarea' ? undefined : 'text',
            text: inputValue
        }) as HTMLInputElement
        if (maxLength) {
            input.maxLength = maxLength
        }

        divContainer.appendChild(label)
        divContainer.appendChild(input)

        return {
            component: input,
            container: divContainer
        }
    }

    public static buildTextareaComponent(labelTxt: string, inputId: string, inputValue: string, maxLength?: number): HtmlComponent {
        return HtmlUtils.buildInternalInputComponent('textarea', labelTxt, inputId, inputValue, maxLength);
    }

    public static buildInputComponent(labelTxt: string, inputId: string, inputValue: string, maxLength?: number): HtmlComponent {
        return HtmlUtils.buildInternalInputComponent('input', labelTxt, inputId, inputValue, maxLength);
    }

    public static buildDatepickerComponent(labelTxt: string, inputId: string, inputValue: string, style?: any): HtmlComponent {
        const divContainer = HtmlUtils.buildElement({
            name: 'div',
            classes: 'form-group col-4',
            style: style
        })

        const label = HtmlUtils.buildElement({
            name: 'label',
            text: labelTxt,
            style: {
                fontWeight: 'bold'
            }
        });

        const input = HtmlUtils.buildElementInput({
            name: 'input',
            id: 'edit' + inputId,
            classes: 'form-control',
            type: 'date',
            text: inputValue
        }) as HTMLInputElement

        divContainer.appendChild(label)
        divContainer.appendChild(input)

        return {
            component: input,
            container: divContainer
        }
    }

    public static buildSelectComponent(labelTxt: string, selectId: string, selectValues: Array<string>, selectedValue?: string): HtmlComponent {
        const divContainer = HtmlUtils.buildElement({
            name: 'div',
            classes: 'form-group col-12'
        })

        const label = HtmlUtils.buildElement({
            name: 'label',
            text: labelTxt,
            style: {
                fontWeight: 'bold'
            }
        });

        const select = document.createElement('select') as HTMLSelectElement
        select.id = 'select' + selectId
        select.classList.add("form-control")

        selectValues.forEach(selectValue => {
            const option = document.createElement('option') as HTMLOptionElement
            option.value = selectValue
            option.textContent = selectValue
            select.appendChild(option);
        })

        if (selectedValue) {
            select.value = selectedValue
        }

        divContainer.appendChild(label)
        divContainer.appendChild(select)

        return {
            component: select,
            container: divContainer
        }
    }
}

export interface HtmlOptions {
    name: string;
    id?: string;
    text?: string;
    classes?: string;
    type?: string;
    placeholder?: string;
    style?: {}
}

export interface HtmlComponent {
    component: any,
    container: HTMLElement
}