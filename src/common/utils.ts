import { v4 as uuidv4 } from "uuid";

import { CategoriesMap, Category } from "../models/Category.dto";

export function sortCategoriesMap(categoriesMap: CategoriesMap): CategoriesMap {
    const sortedEntries = Object.entries(categoriesMap).sort(([, a], [, b]) => 
        a.displayValue.localeCompare(b.displayValue)
    );

    return Object.fromEntries(
        sortedEntries.map(([id, category]) => {
            if (category.subcategories) {
                const sortedSubentries = Object.entries(category.subcategories).sort(([, sa], [, sb]) => 
                    sa.displayValue.localeCompare(sb.displayValue)
                );
                return [id, { ...category, subcategories: Object.fromEntries(sortedSubentries) }];
            }
            return [id, category];
        })
    );
}

export function createCategoryJson(categories: Category[]): CategoriesMap {
    const sortedCategories = [...categories].sort((a, b) => 
        a.displayValue.localeCompare(b.displayValue)
    );

    return sortedCategories.reduce((acc: CategoriesMap, category: Category) => {
        if (category.subcategories) {
            const sortedSubentries = Object.entries(category.subcategories).sort(([, a], [, b]) => 
                a.displayValue.localeCompare(b.displayValue)
            );
            category.subcategories = Object.fromEntries(sortedSubentries);
        }
        acc[category.id] = category;
        return acc;
    }, {});
};

export function generateRandomId() {
    return uuidv4().substring(0, 8);
}

export function numberWithCommas(x: number | string, decimals: number = 2): string {
    if (typeof x === 'string')
        x = Number(x);
    x = x.toFixed(decimals);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}