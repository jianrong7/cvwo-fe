export interface UserData {
  id: number;
  name: string;
  username: string;
  claims?: {
    exp?: number;
    sub?: number;
  };
}
