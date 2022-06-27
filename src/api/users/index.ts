import express from 'express'
import userController from '../../controllers/users'

const router = express.Router()

router
  .get('/', userController.getAllUsers)
  .post('/', userController.createUser)
  .get('/:id', userController.getUserById)
  .delete('/:id', userController.deleteUserById)

export default router
