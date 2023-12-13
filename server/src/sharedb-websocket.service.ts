import { Injectable, INestApplication } from '@nestjs/common';
import { Server } from 'http';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
const ShareDB = require('sharedb');
const richText = require('rich-text');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

@Injectable()
export class ShareDBWebSocketService {
  private backend: any;

  constructor() {
    this.backend = new ShareDB();
    ShareDB.types.register(richText.type);

    this.createDoc(this.startServer.bind(this));
  }

  private createDoc(callback: () => void) {
    const connection = this.backend.connect();
    const doc = connection.get('examples', 'richtext');
    doc.fetch((err: any) => {
      if (err) throw err;
      if (doc.type === null) {
        doc.create([{ insert: '' }], 'rich-text', callback);
        return;
      }
      callback();
    });
  }

  public async startServer(server: Server) {
    const wss = new WebSocket.Server({ port: 3000 });

    wss.on('connection', (ws: any) => {
      const stream = new WebSocketJSONStream(ws);
      this.backend.listen(stream);
    });

    console.log('ShareDB WebSocket server started on port 3000');
  }
}
