import ModData from '../data/gamemodes.json'
import { CategoryData, CategoryMappingData } from "./interfaces/CategoryInterfaces";
import { classicMelvorCategory, limitedEventCategory, otherModdedCategory } from "./references/Categories";
import '../img/icon.png'
import '../img/gamemode_bday.png'
import '../css/styles.css'

import {
  CharacterSelectionPageElement
} from "../components/CharacterSelectionPageElement";

let addedCategories: Map<string, CategoryData> = new Map();
let mappedCategoryItems: Map<string, string> = new Map();

export async function setup(ctx: Modding.ModContext): Promise<void> {
  const api = ctx.api;
  // @ts-ignore
  await ctx.gameData.addPackage(ModData);

  await api({ registerCategory, mapGamemodeToCategory });
  fixEventDates();

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

  new CharacterSelectionPageElement(addedCategories, mappedCategoryItems)
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
