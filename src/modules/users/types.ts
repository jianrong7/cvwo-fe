export interface UserData {
  ID: number;
  name: string;
  username: string;
  claims?: {
    exp?: number;
    sub?: number;
  };
}
