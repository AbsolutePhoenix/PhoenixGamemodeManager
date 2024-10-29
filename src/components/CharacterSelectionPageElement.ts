import { getTemplateNode } from '../ts/utilities/utils';

export class CharacterSelectionPageElement extends HTMLElement {
    public content: DocumentFragment;
    static categoryContainer: HTMLDivElement | null;
    static phoenixGamemodeSelection: HTMLDivElement | null;

    constructor() {
        super();
        this.content = getTemplateNode('character-selection-page-template');
        CharacterSelectionPageElement.categoryContainer = this.content.querySelector('#phoenix-category-container');
        CharacterSelectionPageElement.phoenixGamemodeSelection = this.content.querySelector('#phoenix-gamemode-selection');
    }

    connectedCallback() {
        this.appendChild(this.content);
        this.dispatchEvent(new Event('character-selection-page-connected'));
    }
}

window.customElements.define('character-selection-page', CharacterSelectionPageElement);

export function replaceCharacterSelectionPage(): void {
    const selectionPage = document.querySelector(
        '#character-selection-page-3'
    ) as HTMLElement;

    if (selectionPage) {
        selectionPage.innerHTML = '';
        const characterSelectionPage = document.createElement('character-selection-page') as CharacterSelectionPageElement;
        selectionPage.append(characterSelectionPage);
    } else {
        console.error('Element with ID "#character-selection-page-3" not found.');
    }
}


