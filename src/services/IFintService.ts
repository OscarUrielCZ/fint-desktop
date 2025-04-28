import { Expense } from "../models/Expense.dto";
import { CategoriesMap } from "../models/Category.dto";
import { Budget } from "../models/Budget.dto";

interface IFintService {
    getExpenses(): Promise<Expense[]>;
    getCategories(): Promise<CategoriesMap>;
    getBudget(): Promise<Budget>;
}

export default IFintService;