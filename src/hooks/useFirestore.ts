import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { CreateExpenseDto, UpdateExpenseDto } from '../common/expense.dto';

import { db } from '../firebase';
import { castFirebaseDate } from '../common/utils';
import { Category, Expense } from '../common/types';

// TODO: separar(modular) este archivo junto con api/firebase.ts

function useFirestore() {
    enum DbCollections {
        EXPENSES = 'expenses',
        CATEGORIES = 'categories',
        SUBCATEGORIES = 'subcategories'
    };

    const insertDocument = async (data: CreateExpenseDto, 
                                collectionName: string = DbCollections.EXPENSES) => {
        await addDoc(collection(db, collectionName), data);
    }

    const deleteDocument = async (id: string, 
                                collectionName: string = DbCollections.EXPENSES) => {
        await deleteDoc(doc(db, collectionName, id));
    }

    const updateDocument = async (id: string, data: UpdateExpenseDto, 
                                collectionName: string = DbCollections.EXPENSES) => {
        await updateDoc(doc(db, collectionName, id), data);
    }

    const getAllCollections = async (): Promise<{ expenses: Expense[], categories: Category[] }> => {
        try {
            // expenses
            const expensesSnaps = await getDocs(collection(db, DbCollections.EXPENSES));
            const expensesList: Expense[] = await Promise.all(
                expensesSnaps.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        amount: data.amount,
                        date: castFirebaseDate(data.date),
                        category: data.category,
                        subcategory: data.subcategory,
                        description: data.description,
                    }; 
                })
            );

            // categories and subcategories
            const categoriesSnaps = await getDocs(collection(db, DbCollections.CATEGORIES));
            const categoriesList: Category[] = await Promise.all(
                categoriesSnaps.docs.map(async (category) => {
                    const subcategoriesSnaps = await getDocs(
                        collection(db, DbCollections.CATEGORIES, category.id, DbCollections.SUBCATEGORIES)
                    );
                    const subcategoriesList: Category[] = await Promise.all(
                        subcategoriesSnaps.docs.map(doc => {
                            const data = doc.data();
                            return {
                                id: doc.id,
                                value: data.value,
                                displayValue: data.displayValue,
                            };
                        })
                    );
                    const data = category.data();
                    return {
                        id: category.id,
                        value: data.value,
                        displayValue: data.displayValue,
                        subcategories: subcategoriesList
                    };
            }));
            console.log("lista exp", expensesList);
            console.log('list cats', categoriesList);

            return {
                expenses: expensesList,
                categories: categoriesList
            };
        } catch(e) {
            return {
                expenses: [],
                categories: []
            }
        }
        
    };

    return {
        getAllCollections,
        insertDocument,
        deleteDocument,
        updateDocument
    };
}

export default useFirestore;