import { Category } from "./types";

export function numberWithCommas(x: number | string) {
    if (typeof x === 'string')
        x = Number(x);
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function createCategoryJson(categories: Category[]): {[key: string]: Category} {
    return categories.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
    }, {});
};