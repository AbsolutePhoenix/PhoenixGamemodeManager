declare const game: any;

export class CategoryButtonElement extends HTMLElement {
    private readonly content: DocumentFragment;
    private readonly button: HTMLButtonElement;
    private readonly backgroundContainer: HTMLDivElement;
    private readonly nameElement: HTMLHeadingElement;
    private readonly descriptionContainer: HTMLDivElement;

    constructor() {
        super();
        this.content = new DocumentFragment();
        this.content.append(getTemplateNode('category-button-template'));
        this.button = getElementFromFragment(this.content, "phoenix-category-button", "button");
        this.backgroundContainer = getElementFromFragment(this.content, "phoenix-background-container", "div");
        this.nameElement = getElementFromFragment(this.content, "phoenix-name-header", "h5");
        this.descriptionContainer = getElementFromFragment(this.content, "phoenix-description-container", "div");
    }

    connectedCallback() {
        this.appendChild(this.content);
        this.initializeAttributes();
    }
    getButton(): HTMLButtonElement {return this.button;}
    private initializeAttributes() {
        CategoryButtonElement.observedAttributes.forEach((name) => {
            const value = this.getAttribute(name);
            if (value !== null) {
                this.updateAttribute(name, value);
            }
        });
    }

    static get observedAttributes() {
        return ['button-class', 'text-class', 'category-id', 'category-name', 'category-description', 'category-image-url',];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (this.isConnected) {
            this.updateAttribute(name, newValue);
        }
    }

    private updateAttribute(name: string, value: string | null) {
        switch (name) {
            case 'button-class':
                if (value && this.button) {
                    this.button.className = `btn btn-lg ${value}`;
                }
                break;
            case 'text-class':
                if (value && this.nameElement) {
                    this.nameElement.className = `font-w600 mb-1 pt-2 font-size-lg ${value}`;
                }
                break;
            case 'category-name':
                if (value && this.nameElement) {
                    this.nameElement.textContent = value;
                }
                break;
            case 'category-description':
                if (value && this.descriptionContainer) {
                    const descriptionLines = value.split('\n');
                    this.descriptionContainer.innerHTML = descriptionLines.map((line) => `<h5 class="font-w400 font-size-sm mb-1 text-white">${line}</h5>`).join('');
                }
                break;
            case 'category-image-url':
                if (value && this.backgroundContainer) {
                    this.backgroundContainer.style.backgroundImage = `url('${value}')`;
                }
                break;
        }
    }
}

window.customElements.define('category-button', CategoryButtonElement);
