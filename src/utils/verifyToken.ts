import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string): IUser => {
  return jwtDecode(token);
};
