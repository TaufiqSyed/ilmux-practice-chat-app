declare namespace Express {
  export interface Request {
    accessToken?: string
    userId?: string
    userEmail?: string
  }
}
