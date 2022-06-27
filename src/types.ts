import { Optional } from 'sequelize/types'

export type UserCreationAttributes = {
  email: string
  password: string
}

export type UserAttributes = {
  id?: number
  email: string
  password: string
}

export type UserPayload = {
  id?: number
  email: string
}
