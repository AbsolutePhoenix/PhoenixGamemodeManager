function phoenix_openGamemodeInterface(interfaceName) {
	let gamemodeSelections = document.getElementsByTagName("gamemode-selection");
	let dispLTE = mod
		.getContext("phoenixgamemodemanager")
		.accountStorage.getItem("phoenix-display-lte");
	gamemodeSelections.forEach((element) => {
		if (element.classList.contains("phoenix-cat-" + interfaceName))
			element.style.display = "";
		if (dispLTE === undefined || !dispLTE) return;
		if (
			interfaceName === "other" &&
			element.classList.contains("phoenix-cat-lte")
		)
			element.style.display = "";
	});
	const elements = document.querySelectorAll(
		"#phoenix-category-header, #phoenix-category-container, #phoenix-gamemode-header, #phoenix-gamemode-container",
	);
	elements.forEach((element) => {
		if (element.id.startsWith("phoenix-category")) {
			element.style.display = "none";
		} else {
			element.style.display = "";
		}
	});
}

function phoenix_openStyleInterface() {
	let gamemodeSelections = document.getElementsByTagName("gamemode-selection");
	for (const element of gamemodeSelections) {
		element.style.display = "none";
	}
	const elements = document.querySelectorAll(
		"#phoenix-category-header, #phoenix-category-container, #phoenix-gamemode-header, #phoenix-gamemode-container",
	);
	elements.forEach((element) => {
		if (element.id.startsWith("phoenix-category")) {
			element.style.display = "";
		} else {
			element.style.display = "none";
		}
	});
}
