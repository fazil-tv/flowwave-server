import { User } from "../../../domain/entities";
export interface userSignupResponse {
  message?: string;
  savedUser: User,
  isVerified?:boolean
}
