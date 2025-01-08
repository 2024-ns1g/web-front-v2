import { login } from "./auth/login";
import { register } from "./auth/register";

export const apiEndpoints = {
  auth: {
    login,
    register
  }
}
