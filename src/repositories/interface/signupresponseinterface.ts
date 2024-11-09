import { User } from "../../entities";
export interface SignupResponse {
    savedUser: User;
    refreshtoken: string;
    token: string;
  }
  