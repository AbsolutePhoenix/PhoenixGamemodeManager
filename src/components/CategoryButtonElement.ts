import { getTemplateNode } from '../ts/utilities/utils';

declare const game: any;

export class CategoryButtonElement extends HTMLElement {
    private content: DocumentFragment;
    private button: HTMLButtonElement | null;
    private bgDiv: HTMLDivElement | null;
    private nameElement: HTMLHeadingElement | null;
    private descriptionContainer: HTMLDivElement | null;

    constructor() {
        super();
        // Clone the template content
        this.content = getTemplateNode('category-button-template');

        // Get references to elements within the template
        this.button = this.content.querySelector('button.btn') as HTMLButtonElement;
        this.bgDiv = this.content.querySelector('div.bg-gamemode') as HTMLDivElement;
        this.nameElement = this.content.querySelector('h5.font-w600') as HTMLHeadingElement;
        this.descriptionContainer = this.content.querySelector('div.description') as HTMLDivElement;
    }

    connectedCallback() {
        // Append the content to the custom element
        this.appendChild(this.content);

        // Set up event listener
        this.button.addEventListener('click', () => {
            const categoryId = this.getAttribute('category-id');
            if (categoryId) {
                game.phoenixgamemanager.openGamemodeInterface(categoryId);
            }
        });

        // Initialize the element based on current attributes
        this.initializeAttributes();
    }

    private initializeAttributes() {
        // For each observed attribute, apply the value
        CategoryButtonElement.observedAttributes.forEach((name) => {
            const value = this.getAttribute(name);
            if (value !== null) {
                this.updateAttribute(name, value);
            }
        });
    }

    static get observedAttributes() {
        return [
            'button-class',
            'text-class',
            'category-id',
            'category-name',
            'category-description',
            'category-image-url',
        ];
    }

    attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null
    ) {
        // Only update if the element is connected
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
                    this.descriptionContainer.innerHTML = descriptionLines
                        .map(
                            (line) =>
                                `<h5 class="font-w400 font-size-sm mb-1 text-white">${line}</h5>`
                        )
                        .join('');
                }
                break;
            case 'category-image-url':
                if (value && this.bgDiv) {
                    this.bgDiv.style.backgroundImage = `url('${value}')`;
                }
                break;
        }
    }
}
