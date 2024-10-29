export function getTemplateNode(templateId: string): DocumentFragment {
    const template = document.getElementById(templateId) as HTMLTemplateElement;
    if (template && template.content) {
        return template.content.cloneNode(true) as DocumentFragment;
    }
    throw new Error(`Template with ID ${templateId} not found.`);
}

export function getElementFromFragment<T extends HTMLElement>(
    fragment: DocumentFragment,
    elementId: string,
    tagName: string
): T {
    const selector = `${tagName}#${elementId}`;
    const element = fragment.querySelector(selector) as T;
    if (element) {
        return element;
    }
    throw new Error(
        `Element with ID "${elementId}" and tag "${tagName}" not found in fragment.`
    );
}
