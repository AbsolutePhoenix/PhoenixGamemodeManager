import { getTemplateNode, getElementFromFragment } from '../ts/utilities/utils';

export class CharacterSelectionPageElement extends HTMLElement {
    private content: DocumentFragment;

    constructor() {
        super();
        // Clone the template content and store it for later
        this.content = getTemplateNode('character-selection-page-template');
    }

    connectedCallback() {
        // Append the content to the custom element when it's connected to the DOM
        this.appendChild(this.content);

        // Dispatch a custom event to signal that the element is connected
        this.dispatchEvent(new Event('character-selection-page-connected'));
    }

}

// Define the custom element
window.customElements.define(
    'character-selection-page',
    CharacterSelectionPageElement
);

export function replaceCharacterSelectionPage(): Promise<void> {
    return new Promise((resolve, reject) => {
        const selectionPage = document.querySelector('#character-selection-page-3') as HTMLElement;

        if (selectionPage) {
            // Clear existing content
            selectionPage.innerHTML = '';

            // Create an instance of the custom element
            const characterSelectionPage = document.createElement('character-selection-page') as CharacterSelectionPageElement;

            // Listen for the custom event indicating the element is connected
            characterSelectionPage.addEventListener('character-selection-page-connected', () => {
                resolve();
            });

            // Append the custom element to the container
            selectionPage.appendChild(characterSelectionPage);
        } else {
            console.error('Element with ID "#character-selection-page-3" not found.');
            reject(new Error('Parent container not found.'));
        }
    });
}

