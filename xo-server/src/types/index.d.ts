import { Socket as OriginalSocket } from 'socket.io'

declare module 'socket.io' {
  interface Socket extends OriginalSocket {
    username : string
    room : string
  }
}
