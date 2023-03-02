import { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { db } from "../firebase";

function useFirestore() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const collections = {
        expenses: "expenses",
        categories: "categories",
        subcategories: "subcategories"
    };

    const insertDocument = async (data, collectionName) => {
        await addDoc(collection(db, collectionName), data);
    }

    const deleteDocument = async (id, collectionName) => {
        await deleteDoc(doc(db, collectionName, id));
    }

    const updateDocument = async (id, data) => {
        ;
    }

    const getAllCollections = async () => {
        setLoading(true);

        try {
            // expenses
            const expensesSnaps = await getDocs(collection(db, collections.expenses));
            const expensesList = await Promise.all(expensesSnaps.docs.map(doc => 
                ({ ...doc.data(), id: doc.id }))
            );

            console.log('list exps ', expensesList);

            // categories and subcategories
            const categoriesSnaps = await getDocs(collection(db, collections.categories));
            const categoriesList = await Promise.all(categoriesSnaps.docs.map(async category => {
                const subcategoriesSnaps = await getDocs(
                    collection(db, collections.categories, category.id, collections.subcategories)
                );
                const subcategoriesList = await Promise.all(subcategoriesSnaps.docs.map(doc => (
                    { ...doc.data(), id:doc.id }
                )));
                return {
                    ...category.data(),
                    id: category.id,
                    subcategories: subcategoriesList
                };
            }));
            console.log('list casts', categoriesList);

            return {
                expenses: expensesList,
                categories: categoriesList
            };
        } catch(e) {
            setError(e);
            console.log('error db', e);
            return {
                expenses: [],
                categories: []
            }
        } finally {
            setLoading(false);
        }
        
    };

    return {
        loading,
        error,
        collections,
        getAllCollections,
        insertDocument,
        deleteDocument,
        updateDocument
    };
}

export default useFirestore;