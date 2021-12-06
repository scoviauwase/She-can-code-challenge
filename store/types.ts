export interface AppState {
  errors: Error;
  transactions: Transaction;
  auth: Auth;
}

export interface Transaction {
  transactions: any[];
  isLoading: boolean;
}

export interface Error {
  error: string;
}

export interface Auth {
  message: string;
  isLoading: boolean;
  token: string;
  user: any;
}
