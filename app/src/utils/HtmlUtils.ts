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