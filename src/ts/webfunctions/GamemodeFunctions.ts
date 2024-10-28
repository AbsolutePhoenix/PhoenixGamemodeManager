export function openGamemodeInterface(interfaceName: string): void {
    const gamemodeSelections = document.getElementsByTagName(
        "gamemode-selection"
    ) as HTMLCollectionOf<HTMLElement>;

    const dispLTE = mod
        .getContext("phoenixgamemodemanager")
        .accountStorage.getItem("phoenix-display-lte") as string | null;

    Array.from(gamemodeSelections).forEach((element: HTMLElement) :void => {
        if (element.classList.contains("phoenix-cat-" + interfaceName)) {
            element.style.display = "";
        }

        if (dispLTE === undefined || !dispLTE) return;

        if (
            interfaceName === "other" &&
            element.classList.contains("phoenix-cat-lte")
        ) {
            element.style.display = "";
        }
    });

    const elements : NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(
        "#phoenix-category-header, #phoenix-category-container, #phoenix-gamemode-header, #phoenix-gamemode-container"
    );

    elements.forEach((element : HTMLElement) : void => {
        if (element.id.startsWith("phoenix-category")) {
            element.style.display = "none";
        } else {
            element.style.display = "";
        }
    });
}

export function openStyleInterface(): void {
    const gamemodeSelections = document.getElementsByTagName(
        "gamemode-selection"
    ) as HTMLCollectionOf<HTMLElement>;

    for (const element of gamemodeSelections) {
        element.style.display = "none";
    }

    const elements : NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(
        "#phoenix-category-header, #phoenix-category-container, #phoenix-gamemode-header, #phoenix-gamemode-container"
    );

    elements.forEach((element : HTMLElement) => {
        if (element.id.startsWith("phoenix-category")) {
            element.style.display = "";
        } else {
            element.style.display = "none";
        }
    });
}
