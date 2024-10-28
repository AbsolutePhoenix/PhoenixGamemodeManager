import ModData from '../data/gamemodes.json'
import { CategoryData, CategoryMappingData } from "./interfaces/CategoryInterfaces";
import { classicMelvorCategory, limitedEventCategory, otherModdedCategory } from "./references/Categories";
import { addCategoryToHTML, htmlCharacterSelectionContents } from "./html/HTMLConstants";
import '../img/icon.png'
import '../img/gamemode_bday.png'
import '../css/styles.css'

import {openGamemodeInterface, openStyleInterface} from './webfunctions/GamemodeFunctions'

let addedCategories: Map<string, CategoryData> = new Map();
let mappedCategoryItems: Map<string, string> = new Map();

declare global {
  interface Game {
    phoenixgamemanager: any;
  }
}

export async function setup(ctx: Modding.ModContext): Promise<void> {
  const api = ctx.api;
  // @ts-ignore
  await ctx.gameData.addPackage(ModData);

  await api({ registerCategory, mapGamemodeToCategory });
  fixEventDates();

  game.phoenixgamemanager = {openGamemodeInterface, openStyleInterface};

  registerCategory(classicMelvorCategory);

  mapGamemodeToCategory({ categoryId: "original", gamemodeId: "melvorD:Standard" });
  mapGamemodeToCategory({ categoryId: "original", gamemodeId: "melvorF:Hardcore" });
  mapGamemodeToCategory({ categoryId: "original", gamemodeId: "melvorF:Adventure" });
  mapGamemodeToCategory({ categoryId: "original", gamemodeId: "melvorAoD:AncientRelics" });
  mapGamemodeToCategory({ categoryId: "limitedevent", gamemodeId: "phoenixGamemodeManager:BirthdayMode" });

  ctx.onCharacterSelectionLoaded(characterSelectionLoaded);
}

function characterSelectionLoaded(context: Modding.ModContext): void {
  registerCategory(limitedEventCategory);
  registerCategory(otherModdedCategory);

  const selectionPage = document.querySelector("#character-selection-page-3");
  if (selectionPage) selectionPage.innerHTML = htmlCharacterSelectionContents;

  addedCategories.forEach((category) => {
    addCategoryToHTML(category.buttonClass, category.textClass, category.id, category.name, category.description, category.imageUrl);
  });

  const gamemodeSelectionContainer = document.getElementById('phoenix-gamemode-selection');
  if (gamemodeSelectionContainer) {
    game.gamemodes.forEach((gamemode) => {
      if (gamemode.id === "melvorD:Unset") return;

      const gamemodeSelection = createElement("gamemode-selection");
      gamemodeSelection.setGamemode(gamemode);

      const categoryClass = mappedCategoryItems.get(gamemode.id) ? `phoenix-cat-${mappedCategoryItems.get(gamemode.id)}` :
          gamemode.isEvent ? "phoenix-cat-limitedevent" : "phoenix-cat-other";

      gamemodeSelection.classList.add(categoryClass);
      gamemodeSelection.style.display = 'none';
      gamemodeSelectionContainer.append(gamemodeSelection);
    });
  }
}

function registerCategory(categoryData: CategoryData): void {
  const newCategory: CategoryData = {
    ...categoryData,
    buttonClass: categoryData.buttonClass ?? "btn-gamemode-standard",
    textClass: categoryData.textClass ?? "btn-warning",
    imageUrl: categoryData.imageUrl ?? "https://wiki.melvoridle.com/images/0/0c/Melvor_Logo.svg",
  };
  addedCategories.set(categoryData.id, newCategory);
}

function mapGamemodeToCategory({ categoryId, gamemodeId }: CategoryMappingData): void {
  if (!mappedCategoryItems.has(gamemodeId)) {
    mappedCategoryItems.set(gamemodeId, categoryId);
  } else {
    console.warn(`Gamemode with id ${gamemodeId} is already registered in category ${mappedCategoryItems.get(gamemodeId)}.`);
  }
}

function fixEventDates(): void {
  game.gamemodes.namespaceMaps.forEach((modeMap) => {
    modeMap.forEach((modeData) => {
      if (modeData.isEvent) {
        modeData.endDate = 8321841000000000;
        modeData.btnClass = "btn-gamemode-chaos";
      }
    });
  });
}
