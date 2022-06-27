import { Router } from 'express'
import usersRouter from './users'
import authRouter from './auth'
// import chatRoomRouter from './chatRoom'
// import deleteRouter from './delete'
import { encode } from '../middleware/jwt'

const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)

export default router
