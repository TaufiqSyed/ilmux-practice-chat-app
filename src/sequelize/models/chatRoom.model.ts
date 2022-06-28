import {
  Table,
  Column,
  Model,
  AllowNull,
  IsUUID,
  PrimaryKey,
} from 'sequelize-typescript'
import { ChatRoomAttributes } from '../../types'

@Table
export class ChatRoom extends Model implements ChatRoomAttributes {
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
