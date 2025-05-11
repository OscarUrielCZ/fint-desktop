import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebase";

import { Budget } from '../../models/Budget.dto';

const COLLECTION_NAME = "budgets";

export async function findByUserId(userId: string): Promise<Budget> {
    // make a firebase search to find budget by userId field
    const collectionRef = collection(db, COLLECTION_NAME);
    const budgetQuery = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(budgetQuery);

    let budget: Budget | null = null;

    querySnapshot.forEach((doc) => {
        budget = {
            id: doc.id,
            items: doc.get("items")
        };
    });

    if (!budget) {
        return Promise.reject(new Error("Budget not found"));
    }

    return budget;
}