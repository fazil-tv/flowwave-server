import { User } from "../../entities";
export interface userSignupResponse {
  message?: string;
  savedUser: User,
}
