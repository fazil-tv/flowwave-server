import { User } from "../../domain/entities";
export interface SignupResponse {
    savedUser: User;
    refreshtoken: string;
    token: string;
  }
  