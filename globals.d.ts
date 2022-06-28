import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

declare global {
  var io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
}
