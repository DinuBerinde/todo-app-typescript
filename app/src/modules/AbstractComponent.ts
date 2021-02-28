import {HtmlUtils} from "../utils/HtmlUtils";

/**
 * Abstract component which appends a child HTML element to a parent HTML element
 * and it renders to child content.
 */
export abstract class AbstractComponent {
    protected readonly rootEl: HTMLElement;
    protected readonly properties;

    constructor(properties: any = {}) {
        this.properties = properties;
        this.rootEl = this.buildRootElement(properties.id)
        properties.parentEl.appendChild(this.rootEl);
        this.render()
    }

    /**
     * Render method to be implemented.
     */
    public abstract render(): AbstractComponent;

    /**
     * It builds and returns the root element of this component.
     */
    public abstract buildRootElement(id?: string): HTMLElement;

    /**
     * Yields the HTML element of this component.
     */
    public getEl(): HTMLElement {
        return this.rootEl;
    }
}

