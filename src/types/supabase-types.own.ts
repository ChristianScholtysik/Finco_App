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
