import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoModule } from './to-do/to-do.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ToDoModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
