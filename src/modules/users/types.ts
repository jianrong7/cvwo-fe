export interface UserData {
  ID: number;
  name: string;
  username: string;
  claims?: {
    exp?: number;
    sub?: number;
  };
}

export interface UserLoginOutput {
  token: string;
  username: string;
}
