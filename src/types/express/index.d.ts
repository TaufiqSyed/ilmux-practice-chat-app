declare namespace Express {
  export interface Request {
    accessToken?: string
    userId?: number
    userEmail?: string
  }
}
