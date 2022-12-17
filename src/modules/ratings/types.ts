import { UserData } from "../users/types";

export interface Rating {
  ID: number;
  value: number;
  userId: number;
  user: UserData;
  entryId: number;
  entryType: "post" | "comment";
}
