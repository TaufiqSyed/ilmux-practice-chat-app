import {
  Table,
  Column,
  Model,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript'
import { UserAttributes } from '../../types'

@Table
export class User extends Model implements UserAttributes {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number

  @AllowNull(false)
  @Column
  email!: string

  @AllowNull(false)
  @Column
  password!: string
}
