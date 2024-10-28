/**
 * Interface representing a category that groups similar gamemodes.
 */
export interface CategoryData {
    /** Unique identifier for the category */
    id: string;

    /** Display name of the category shown to the user */
    name: string;

    /** Array of description lines that provide details about the category */
    description: string[];

    /** Optional CSS class for button styling, defaults to standard if not provided */
    buttonClass?: string;

    /** Optional CSS class for text styling within the button, defaults to a warning style if not provided */
    textClass?: string;

    /** Optional URL for an image to display as the category's background or icon */
    imageUrl?: string;
}

/**
 * Interface mapping a specific gamemode to a category, used for categorizing gamemodes in the UI.
 */
export interface CategoryMappingData {
    /** Identifier of the category to which the gamemode belongs */
    categoryId: string;

    /** Identifier of the specific gamemode being mapped to a category */
    gamemodeId: string;
}
