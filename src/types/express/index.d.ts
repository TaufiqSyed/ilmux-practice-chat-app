declare namespace Express {
  export interface Request {
    authToken?: string
    userId?: number
    userEmail?: string
  }
}
