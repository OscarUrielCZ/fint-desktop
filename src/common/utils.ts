import { v4 as uuidv4 } from "uuid";

import { Category } from "./types";
import { CategoriesMap } from "../models/Category.dto";

export function createCategoryJson(categories: Category[]): CategoriesMap {
    return categories.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
    }, {});
};

export function generateRandomId() {
    return uuidv4().substring(0, 8);
}

export function numberWithCommas(x: number | string) {
    if (typeof x === 'string')
        x = Number(x);
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}