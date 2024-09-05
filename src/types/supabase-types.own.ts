import { Tables } from "./supabase-types-gen";

export type Profile = Tables<"profiles">;
export type Account = Tables<"account">;
export type Transactions = Tables<"transactions">;

export interface IProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
  created_at: string;
  card_number: number;
}

export interface IAccount {
  id: string;
  amount: number | null;
  created_at: string;
  profile_id: string;
}

export interface ITransaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  transaction_date: string;
  created_at: string;
  income_expenses: IncomeExpenses;
  account_id: string;
}
export enum IncomeExpenses {
  INCOME = "income",
  EXPENSE = "expense",
}
