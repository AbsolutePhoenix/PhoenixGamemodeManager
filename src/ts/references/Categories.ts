import {CategoryData} from "../interfaces/CategoryInterfaces";

/**
 * Category for classic Melvor gamemodes, representing the core and original experiences.
 * Includes gamemodes designed by the official developers to maintain a balanced gameplay structure.
 */
export const classicMelvorCategory: CategoryData = {
    id: "original",
    name: "Classic Melvor Gamemodes",
    description: [
        "Houses all the original gamemodes created by the developers of Melvor Idle",
        "These modes offer a balanced gameplay experience and core challenges.",
        "Ideal for new and experienced players alike, preserving the intended design."
    ],
    buttonClass: "btn-gamemode-relic",
    textClass: "text-info",
    imageUrl: "https://wiki.melvoridle.com/images/0/0c/Melvor_Logo.svg"
}

/**
 * Category for time-limited event gamemodes, featuring unique, past events.
 * Event gamemodes offered distinct challenges and rewards but are no longer part of regular gameplay.
 */
export const limitedEventCategory: CategoryData = {
    id: "limitedevent",
    name: "Time-Limited Event Gamemodes",
    description: [
        "Houses gamemodes from past events that were available for limited times.",
        "These modes often introduced unique challenges and special rewards.",
        "Although no longer part of regular gameplay, they remain memorable."
    ],
    buttonClass: "btn-gamemode-chaos",
    textClass: "text-warning",
    imageUrl: "https://wiki.melvoridle.com/images/7/7d/Chaos.svg"
};

/**
 * Category for community-created modded gamemodes, showcasing the creativity of Melvor Idle’s modding community.
 * These gamemodes can range from minor tweaks to entirely new gameplay experiences.
 */
export const otherModdedCategory: CategoryData = {
    id: "other",
    name: "Other Modded Gamemodes",
    description: [
        "Houses gamemodes created by the wider modding community of Melvor Idle.",
        "These modes range from small tweaks to significant gameplay overhauls.",
        "Explore new twists and content brought by passionate community members."
    ],
    buttonClass: "btn-gamemode-standard",
    textClass: "text-warn",
    imageUrl: "https://cdn-images-1.medium.com/v2/1*LYzqOAxlTXaCFATID_bHvA@2x.png"
};