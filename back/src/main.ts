import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT as string;
  const corsOptions = {
    origin: ['http://localhost:8000', 'ws://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  setupSwagger(app);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
