export const htmlCharacterSelectionContents = `
    <div class="text-center mb-3" id="phoenix-category-header">
        <h1 class="font-w700 mb-2 text-white">Select a Category</h1>
        <h5 class="font-w300 mb-2 text-white">Choose a mode category that best fits your play style.</h5>
        <h5 class="font-w300 mb-2 text-white">If you are new to the game, start with the Classic Melvor Gamemodes.</h5>
    </div>

    <div class="row no-gutters justify-content-center">
        <div class="col-12 col-md-8" id="phoenix-category-container"></div>
    </div>

    <div class="text-center mb-3" id="phoenix-gamemode-header" style="display:none;">
        <h1 class="font-w700 mb-2 text-white">Select your Gamemode.</h1>
    </div>

    <div class="row no-gutters justify-content-center" id="phoenix-gamemode-container" style="display:none;">
        <div class="col-12 col-md-8" id="phoenix-gamemode-selection-button">
            <button role="button" class="btn btn-sm btn-warning btn-cloud-sign-in-back js-click-ripple-enabled"
                data-toggle="click-ripple" onclick="phoenix_openStyleInterface();" style="overflow: hidden; position: relative; z-index: 1;">
                <i class="fa fa-fw fa-arrow-left opacity-50"></i>
                <span class="ms-1">Go back to Category Selection</span>
            </button>
        </div>
        <div class="col-12 col-md-8" id="phoenix-gamemode-selection"></div>
        <div class="col-12 col-md-8" id="gamemode-selection" style="display:none;"></div>
    </div>
`;

export function addCategoryToHTML(buttonClass: string, textClass: string, categoryId: string, categoryName: string, categoryDescriptionArray: string[], categoryImageURL: string): void {
    const container = document.getElementById("phoenix-category-container");

    if (container) {
        const button = document.createElement("div");
        button.className = "btn-group w-100 mt-2 mb-2";
        button.setAttribute("role", "group");
        button.setAttribute("aria-label", "Horizontal Primary");

        const descriptionHtml = categoryDescriptionArray
            .map(line => `<h5 class="font-w400 font-size-sm mb-1 text-white">${line}</h5>`)
            .join('');

        button.innerHTML = `
            <button type="button" class="btn btn-lg ${buttonClass}" style="width:70%;" onclick="phoenix_openGamemodeInterface('${categoryId}')">
                <div class="bg-gamemode align-right" style="background-image: url('${categoryImageURL}');"></div>
                <div class="media d-flex align-items-center push">
                    <div class="media-body text-left mr-2">
                        <h5 class="font-w600 mb-1 pt-2 font-size-lg ${textClass}">${categoryName}</h5>
                        <h5 class="font-w400 font-size-sm mb-1 text-white">&nbsp;</h5>
                        ${descriptionHtml}
                        <h5 class="font-w400 font-size-sm mb-1 text-white">&nbsp;</h5>
                    </div>
                </div>
            </button>
        `;

        container.appendChild(button);
    }
}
