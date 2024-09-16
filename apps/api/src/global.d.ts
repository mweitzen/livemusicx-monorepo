import { UserPayload } from './auth/dto';

declare global {
  namespace Express {
    /**
     * Extend Express User interface to define
     * User Payload passed from Passport Auth to
     * Express Request object after authenticating.
     *
     */
    export interface User extends UserPayload {}
  }
}
