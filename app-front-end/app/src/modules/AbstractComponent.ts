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
    }

    /**
     * Render method to be implemented.
     */
    public abstract render(): void;

    /**
     * It builds and returns the root element of this component.
     */
    public abstract buildRootElement(id?: string): HTMLElement;

    /**
     * Yields the HTML element of this component.
     */
    public getEl(): HTMLElement {
        this.render();
        return this.rootEl;
    }
}

