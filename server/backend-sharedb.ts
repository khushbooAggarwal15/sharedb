import { WebSocketServer } from "ws";

var http = require("http");
var express = require("express");
var ShareDB = require("sharedb");
var richText = require("rich-text");
var WebSocket = require("ws");
var WebSocketJSONStream = require("@teamwork/websocket-json-stream");

ShareDB.types.register(richText.type);
var backend = new ShareDB();
createDoc(startServer);

function createDoc(callback: any) {
  var connection = backend.connect();
  var doc = connection.get("examples", "richtext");
  doc.fetch(function (err: any) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create([{ insert: "" }], "rich-text", callback);
      return;
    }
    callback();
  });
}

function startServer() {
  var app = express();
  app.use(express.static("static"));
  app.use(express.static("node_modules/quill/dist"));
  var server = http.createServer(app);

  var wss = new WebSocket.Server({ server: server });
  wss.on("connection", function (ws: WebSocketServer) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(3001);
  console.log("Listening on http://localhost:3001");
}
