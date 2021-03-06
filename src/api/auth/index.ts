import { Router } from 'express'
import { decode, encode } from '../../middleware/jwt'

const router = Router()

router.post('/', encode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    authorization: req.accessToken,
  })
})

router.get('/', decode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    userId: req.userId,
    userEmail: req.userEmail,
  })
})

export default router
