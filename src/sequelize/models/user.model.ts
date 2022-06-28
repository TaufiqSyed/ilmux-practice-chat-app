import {
  Table,
  Column,
  Model,
  AllowNull,
  IsUUID,
  PrimaryKey,
} from 'sequelize-typescript'
import { UserAttributes } from '../../types'

@Table
export class User extends Model implements UserAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id?: string

  @AllowNull(false)
  @Column
  email!: string

  @AllowNull(false)
  @Column
  password!: string
}
