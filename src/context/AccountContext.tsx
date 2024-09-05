import { createContext } from "react";
import { IAccount } from "../types/supabase-types.own";

interface AccountContext {
  account: IAccount | null;
  setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
}

export const AccountContext = createContext<AccountContext | undefined>(
  undefined
);
