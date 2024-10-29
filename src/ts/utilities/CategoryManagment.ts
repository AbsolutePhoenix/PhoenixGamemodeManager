import {CategoryButtonElement} from "../../components/CategoryButtonElement"; // Ensure the custom element is defined

export function addCategoryToHTML(
    buttonClass: string,
    textClass: string,
    categoryId: string,
    categoryName: string,
    categoryDescriptionArray: string[],
    categoryImageURL: string
): void {
    const container = document.getElementById('phoenix-category-container');

    if (container) {
        // Create an instance of the custom element
        const categoryButton = document.createElement(
            'category-button'
        ) as CategoryButtonElement;

        // Set attributes
        categoryButton.setAttribute('button-class', buttonClass);
        categoryButton.setAttribute('text-class', textClass);
        categoryButton.setAttribute('category-id', categoryId);
        categoryButton.setAttribute('category-name', categoryName);
        categoryButton.setAttribute(
            'category-description',
            categoryDescriptionArray.join('\n')
        );
        categoryButton.setAttribute('category-image-url', categoryImageURL);

        // Append the custom element to the container
        container.appendChild(categoryButton);
    }
}
