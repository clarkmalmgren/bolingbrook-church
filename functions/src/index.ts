
import { ConnectController } from './connect'
import { ConnectRequest } from './models/connect-request'
import { ServeRequest } from './models/serve-request'

export const connect = new ConnectController(raw => new ConnectRequest(raw)).handler
export const serve = new ConnectController(raw => new ServeRequest(raw)).handler
export { sermons } from './sermons'
