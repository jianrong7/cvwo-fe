import { UserModel } from "../users/types";

export interface Rating {
  ID: number;
  value: number;
  userId: number;
  user: UserModel;
  entryId: number;
  entryType: "post" | "comment";
}
