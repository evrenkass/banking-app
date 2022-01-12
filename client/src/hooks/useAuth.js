import { useContext } from "react";
import { AuthContext } from "../core/auth";

export const useAuth = () => {
  return useContext(AuthContext);
};
