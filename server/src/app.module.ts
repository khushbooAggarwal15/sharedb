import { Module } from '@nestjs/common';
import { ShareDBWebSocketService } from './sharedb-websocket.service';

@Module({
  providers: [ShareDBWebSocketService],
})
export class AppModule {}
