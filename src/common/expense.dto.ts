import { Expense } from "./types";

export interface CreateExpenseDto extends Omit<Expense, "id"> {};

export interface UpdateExpenseDto extends Partial<Expense> {};