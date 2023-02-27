import { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { db } from "../firebase";

function useFirestore(collectionName) {
    const [loading, setLoading] = useState(false); // TODO: ponerlo en TRUE
    const [error, setError] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    const addDocument = async (data) => {
        await addDoc(collection(db, collectionName), data);
    }

    const getAllDocuments = async () => {
        setLoading(true);
        try {
            const snapshots = await getDocs(collection(db, collectionName));
            const list = snapshots.docs.map(d => ({ ...d.data(), id:d.id }));
            return list;
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (id) => {
        await deleteDoc(doc(db, collectionName, id));
    }

    const updateDocument = async (id, data) => {
        ;
    }

    const getAllCollections = async () => {
        // const expensesSnaps = await getDocs(collection(db, 'expenses'));
        // const expensesList = expensesSnaps.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        // categories and subcategories

        const categoriesSnaps = await getDocs(collection(db, 'categories'));
        const categoriesList = await Promise.all(categoriesSnaps.docs.map(async category => {
            const subcategoriesSnaps = await getDocs(collection(db, 'categories', category.id, 'subcategories'));
            const subcategoriesList = await Promise.all(subcategoriesSnaps.docs.map(doc => (
                { ...doc.data(), id:doc.id }
            )));
            return {
                ...category.data(),
                id: category.id,
                subcategories: subcategoriesList
            };
        }));

        console.log('cats', categoriesList);
        setCategories(categoriesList);
        console.log(categories);
    };

    return {
        loading,
        error,
        expenses,
        categories,
        getAllCollections
    };
}

export default useFirestore;