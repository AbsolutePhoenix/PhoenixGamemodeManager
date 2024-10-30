import {CategoryData} from "../ts/interfaces/CategoryInterfaces";
import {CategoryButtonElement} from "./CategoryButtonElement";

export class CharacterSelectionPageElement extends HTMLElement {
    public content: DocumentFragment;
    private categoryHeader: HTMLElement;
    private categoryContainer: HTMLDivElement;
    private gamemodeHeader: HTMLElement;
    private gamemodeContainer: HTMLHeadingElement;
    private gamemodeSelection: HTMLDivElement;
    private backButton: HTMLButtonElement;

    constructor(categories: Map<string, CategoryData>, mappedGamemodes: Map<string, string>) {
        super();
        this.content = new DocumentFragment();
        this.content.append(getTemplateNode('character-selection-page-template'));
        this.categoryHeader = getElementFromFragment(this.content, "phoenix-category-header", "div");
        this.categoryContainer = getElementFromFragment(this.content, "phoenix-category-container", "div")
        this.gamemodeHeader = getElementFromFragment(this.content, "phoenix-gamemode-header", "div");
        this.gamemodeContainer = getElementFromFragment(this.content, "phoenix-gamemode-container", "div");
        this.gamemodeSelection = getElementFromFragment(this.content, "phoenix-gamemode-selection", "div")
        this.backButton = getElementFromFragment(this.content, "phoenix-back-button", "button");
        this.addCategories(categories);
        this.addGamemodes(mappedGamemodes)
    }

    connectedCallback() {
        this.backButton.addEventListener("click", () => this.showCategoryInterface())
        this.appendChild(this.content);
    }

    public showCategoryInterface(): void {
        if (this.categoryHeader) this.categoryHeader.style.display = "";
        if (this.categoryContainer) this.categoryContainer.style.display = "";
        if (this.gamemodeHeader) this.gamemodeHeader.style.display = "none";
        if (this.gamemodeSelection) this.gamemodeContainer.style.display = "none";
    }

    public showGamemodeInterface(interfaceName: string): void {
        const gamemodeSelections = this.gamemodeContainer.querySelectorAll<HTMLElement>('gamemode-selection');

        gamemodeSelections.forEach((element: HTMLElement): void => {
            if (element.classList.contains("phoenix-cat-" + interfaceName)) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });

        if (this.categoryHeader) this.categoryHeader.style.display = "none";
        if (this.categoryContainer) this.categoryContainer.style.display = "none";
        if (this.gamemodeHeader) this.gamemodeHeader.style.display = "";
        if (this.gamemodeSelection) this.gamemodeContainer.style.display = "";
    }

    addCategories(categories: Map<string, CategoryData>) {
        categories.forEach(category => {
            const categoryButton : CategoryButtonElement = new CategoryButtonElement();
            categoryButton.getButton().addEventListener("click", () => this.showGamemodeInterface(category.id));
            categoryButton.setAttribute('button-class', category.buttonClass);
            categoryButton.setAttribute('text-class', category.textClass);
            categoryButton.setAttribute('category-id', category.id);
            categoryButton.setAttribute('category-name', category.name);
            categoryButton.setAttribute('category-description', category.description.join('\n'));
            categoryButton.setAttribute('category-image-url', category.imageUrl);

            this.categoryContainer.appendChild(categoryButton);
        })

    }

    addGamemodes(mappedGamemodes: Map<string, string>) {
        console.log("loading gamemodes");
        game.gamemodes.forEach((gamemode) => {
            if (gamemode.id === "melvorD:Unset") return;

            const gamemodeSelection = createElement("gamemode-selection");
            gamemodeSelection.setGamemode(gamemode);

            const categoryClass = mappedGamemodes.get(gamemode.id) ? `phoenix-cat-${mappedGamemodes.get(gamemode.id)}` :
                gamemode.isEvent ? "phoenix-cat-limitedevent" : "phoenix-cat-other";

            gamemodeSelection.classList.add(categoryClass);
            gamemodeSelection.style.display = 'none';
            this.gamemodeSelection.appendChild(gamemodeSelection);
        })
    }
}

window.customElements.define('character-selection-page', CharacterSelectionPageElement);



