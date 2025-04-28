
export type Category = {
    id: string,
    value: string,
    displayValue: string,
    subcategories?: { [key: string]: Category }
};

export type CategoriesMap = { [key: string]: Category };