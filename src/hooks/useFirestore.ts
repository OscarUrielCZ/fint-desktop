import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

import { db } from '../firebase';
import { castFirebaseDate } from '../utils.ts';
import { Category, Expense } from '../common/types.ts';
import { createCategoryJson } from '../common/utils.ts';

function useFirestore() {
    enum DbCollections {
        EXPENSES = 'expenses',
        CATEGORIES = 'categories'
    };

    const insertDocument = async (data: any, 
                                collectionName: string = DbCollections.EXPENSES) => {
        await addDoc(collection(db, collectionName), data);
    }

    const deleteDocument = async (id: string, 
                                collectionName: string = DbCollections.EXPENSES) => {
        await deleteDoc(doc(db, collectionName, id));
    }

    const updateDocument = async (id: string, data: any, 
                                collectionName: string = DbCollections.EXPENSES) => {
        await updateDoc(doc(db, collectionName, id), data);
    }

    const getCategories: () => Promise<{[key: string]: Category}> = async () => {
        const categorySnaps = await getDocs(collection(db, DbCollections.CATEGORIES));
        const categoryList: Category[] = await Promise.all(categorySnaps.docs.map(async doc => {
            const id: string = doc.id;
            const data: any = doc.data();
            const value: string = data.value;
            const displayValue: string = data.displayValue;

            const subcategorySnaps = await getDocs(collection(db, `${DbCollections.CATEGORIES}/${id}/subcategories`));
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

        return createCategoryJson(categoryList);
    }

    const getExpenses: () => Promise<Expense[]> = async () => {
        const expensesSnaps = await getDocs(collection(db, DbCollections.EXPENSES));
        const expensesList: Expense[] = await Promise.all(expensesSnaps.docs.map(doc => {
            const id = doc.id;
            const data = doc.data();
            const date = castFirebaseDate(data.date);

            return {
                id,
                amount: data.amount,
                date,
                category: data.category,
                description: data.description,
                status: data.status,
                categoryId: data.category_id,
                subcategoryId: data.subcategoryId
            }
        }));

        return expensesList; 
    };

    return {
        getCategories,
        getExpenses,
        insertDocument,
        deleteDocument,
        updateDocument
    };
}

export default useFirestore;