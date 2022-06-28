import {
  Table,
  Column,
  Model,
  AllowNull,
  PrimaryKey,
  IsUUID,
  Default,
} from 'sequelize-typescript'
import { DataTypes, UUIDV4 } from 'sequelize'
import { UserAttributes } from '../../types'

@Table
export class User extends Model implements UserAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id?: string

  @AllowNull(false)
  @Column
  email!: string

  @AllowNull(false)
  @Column
  password!: string
}
