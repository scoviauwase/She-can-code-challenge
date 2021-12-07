export interface AppState {
  errors: Error;
  transactions: Transaction;
  auth: Auth;
  users: User;
}

export interface Transaction {
  transactions: any[];
  isLoading: boolean;
  message: string;
  success: boolean;
}

export interface Error {
  error: string;
}

export interface Auth {
  message: string;
  isLoading: boolean;
  token: string;
  user: any;
  id: number;
}

export interface User {
  users: [];
  isLoading: boolean;
  message: string;
}
