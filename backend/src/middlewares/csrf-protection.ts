
import { doubleCsrfOptions } from "../config";
import { doubleCsrf } from "csrf-csrf";

export const {
    invalidCsrfTokenError,
    generateToken,
    validateRequest,
    doubleCsrfProtection, 
  } = doubleCsrf(doubleCsrfOptions);