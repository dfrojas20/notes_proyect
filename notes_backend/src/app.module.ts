import { Module } from '@nestjs/common';
import { AppController } from './notes.controller';
import { InsertNoteService } from './services/insert.note.service';
import { mongoNoteRepository } from './repositories/mongo-note-repository';
import { getNoteService } from './services/get.note.service';
import { UpdateNoteService } from './services/update.note.service';

var url: string = process.env.DB_HOST
console.log("app version 1.0")
console.log(url)

@Module({
  controllers: [AppController],
  providers: [InsertNoteService,getNoteService,UpdateNoteService,
    { provide: 'INoteRepository',
      useClass: mongoNoteRepository}]
  
})
export class AppModule {}
