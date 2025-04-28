import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";

import { Category } from '../../models/Category.dto';
import { createCategoryJson } from '../../common/utils.ts';

const COLLECTION_NAME = "categories";

export async function findAll(): Promise<Category[]> {
    const categorySnaps = await getDocs(collection(db, COLLECTION_NAME));
    const categoryList: Category[] = await Promise.all(categorySnaps.docs.map(async doc => {
        const id: string = doc.id;
        const data: any = doc.data();
        const value: string = data.value;
        const displayValue: string = data.displayValue;

        const subcategoryCollection = collection(db, `${COLLECTION_NAME}/${id}/subcategories`);
        const subcategorySnaps = await getDocs(subcategoryCollection);
        const subcategoryList = await Promise.all(subcategorySnaps.docs.map(doc =>
            ({ id: doc.id, value: doc.data().value, displayValue: doc.data().displayValue })
        ));
        const subcategoryJson = createCategoryJson(subcategoryList);

        return {
            id,
            value,
            displayValue,
            subcategories: subcategoryJson
        }
    }));
    return categoryList;
}
