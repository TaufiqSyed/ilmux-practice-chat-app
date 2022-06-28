import jwt from 'jsonwebtoken'
import { User } from '../sequelize/models/user.model'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { UserPayload } from '../types'
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
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      sameSite: false,
      secure: process.env.NODE_ENV == 'production',
    })
    next()
    return
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.error })
  }
}

export const decode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies['access-token']
  if (!accessToken) {
    return res
      .status(400)
      .json({ success: false, message: 'No access token provided' })
  }
  try {
    const decoded = <UserPayload>jwt.verify(accessToken, SECRET_KEY)
    const userExists: boolean =
      (await User.findOne({ where: { id: decoded.id } })) != null

    if (!userExists) {
      return res
        .clearCookie('access-token')
        .status(401)
        .json({ success: false, message: 'Deleted account' })
    }
    req.userId = decoded.id
    req.userEmail = decoded.email
    return next()
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message })
  }
}
