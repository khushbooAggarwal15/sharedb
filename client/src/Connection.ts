import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import * as richText from "rich-text";

sharedb.types.register(richText.type);

// var socket = new ReconnectingWebSocket(
//   "ws://sharedb-backend.vercel.app/"
// ) as any;
var socket = new ReconnectingWebSocket(
  "ws://sharedb-backend.vercel.app"
) as any;

var connection = new sharedb.Connection(socket);
export default connection;
