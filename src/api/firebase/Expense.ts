import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase";

import { Expense, NewExpense } from "../../models/Expense.dto";
import { castFirebaseDate } from '../../utils.ts';

const COLLECTION_NAME = "expenses";

export async function findAll(): Promise<Expense[]> {
    const expensesSnaps = await getDocs(collection(db, COLLECTION_NAME));
    const expensesList: Expense[] = await Promise.all(expensesSnaps.docs.map(doc => {
        const id = doc.id;
        const data = doc.data();
        const date = castFirebaseDate(data.date);

        return {
            id,
            amount: data.amount,
            date,
            description: data.description,
            categoryId: data.categoryId,
            subcategoryId: data.subcategoryId
        }
    }));

    return expensesList; 
}

export async function remove(id: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
}

export async function save(expense: NewExpense) {
    await addDoc(collection(db, COLLECTION_NAME), expense);
}

export async function update(id: string, expense: NewExpense) {
    await updateDoc(doc(db, COLLECTION_NAME, id), expense);
}