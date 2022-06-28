import jwt from 'jsonwebtoken'
import { User } from '../sequelize/models/user.model'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { UserAttributes, UserPayload } from '../types'
import bcrypt from 'bcrypt'
dotenv.config()
const SECRET_KEY = process.env.SECRET!

export const encode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail: string = req.body.userEmail
    const userPassword: string = req.body.userPassword
    const user = (await User.findOne({ where: { email: userEmail } }))!
    await bcrypt.compare(userPassword, user.password)
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
    }
    const accessToken = jwt.sign(payload, SECRET_KEY)
    req.accessToken = accessToken
    next()
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.error })
  }
}

export const decode = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = <string | undefined>req.cookies['access-token']
  if (!accessToken) {
    return res
      .status(400)
      .json({ success: false, message: 'No access token provided' })
  }

  try {
    const decoded = <UserPayload>jwt.verify(accessToken!, SECRET_KEY)
    req.userId = decoded.id
    req.userEmail = decoded.email
    return next()
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message })
  }
}
