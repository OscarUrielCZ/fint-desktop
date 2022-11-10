import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { db } from "../firebase";

const EXPENSES_COLLECTION = "expenses";

function useFirestore() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses();
    }, []);

    const addExpense = async (expense) => {
        await addDoc(collection(db, EXPENSES_COLLECTION), expense);
        getExpenses();
    }

    const getExpenses = async () => {
        setLoading(true);
        try {
            const snapshots = await getDocs(collection(db, EXPENSES_COLLECTION));
            const list = snapshots.docs.map(d => ({ ...d.data(), id:d.id }));
            setExpenses(list);
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id) => {
        console.log("Eliminando");
        await deleteDoc(doc(db, EXPENSES_COLLECTION, id));
        getExpenses();
        /*const expensesRef = collection(db, EXPENSES_COLLECTION);
        const q = query(expensesRef, where("id", "==", id));
        const snaps = await getDocs(q);
        snaps.forEach(d => deleteDoc(d.ref));
        */
    }

    const updateExpense = async (id, expense) => {
        ;
    }

    return {
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        loading,
        error
    };
}

export default useFirestore;