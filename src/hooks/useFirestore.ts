import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

import { db } from '../firebase';
import { castFirebaseDate } from '../utils.ts';

function useFirestore() {
    enum DbCollections {
        EXPENSES = 'expenses',
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

    const getAllCollections = async () => {
        try {
            // expenses
            const expensesSnaps = await getDocs(collection(db, DbCollections.EXPENSES));
            const expensesList = await Promise.all(expensesSnaps.docs.map(doc => 
                ({ ...doc.data(), id: doc.id, date: castFirebaseDate(doc.data().date) }))
            );

            return {
                expenses: expensesList,
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