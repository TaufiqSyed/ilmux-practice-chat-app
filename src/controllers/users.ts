// getAllUsers
// onCreateUser
// onGetUserById
// onDeleteUserById

import { User } from '../sequelize/models/user.model'
import { UserAttributes, UserCreationAttributes } from '../types'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'

exports.getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await User.findAll()).status(200)
  } catch (err) {
    res.send('Failed to fetch users').status(500)
  }
}

exports.createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .regex(/\S+@\S+\.\S+/)
        .required(),
      password: Joi.string().min(8).max(30).required(),
    })
    await schema.validateAsync(req.body)
    const user: UserCreationAttributes = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    }
    console.log(user)
    const newUser = await User.create(user)
    res.status(201).send('Created user with id ' + newUser.id)
  } catch (err) {
    res.status(400).send('Failed to create user')
  }
}

exports.getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id)
    const user = await User.findByPk(id)
    if (user == null) {
      res.status(400).send('No user exists with the provided id')
    } else {
      res.send(user)
    }
  } catch (err) {
    res.status(201).send('No user exists with the provided id')
  }
}
exports.deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.id
    const numDeletes: number = await User.destroy({ where: { id: id } })
    if (numDeletes == 0) {
      res.status(400).send('No user exists with the provided id')
    } else {
      res.sendStatus(201)
    }
  } catch (err) {
    res.sendStatus(400)
  }
}

export default exports
