import { Module } from '@nestjs/common';
import { AppController } from './notes.controller';
import { InsertNoteService } from './services/insert.note.service';
import { UpdateNoteService } from './services/update.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { getNoteService } from './services/get.note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';

var url: string = process.env.DB_HOST

//*`mongodb://${url1}:27017,${url2}:27017,${url3}:27017/test?replicaSet=myReplicaSet`

if (url === undefined ) url = 'mongodb://mongo:AyDxAggoIFCQkKBkKkYKFvrkjMOXmVNN@monorail.proxy.rlwy.net:52294'

console.log(url)

@Module({
  imports: [MongooseModule.forRoot(url),
            MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])         
  ],
  controllers: [AppController],
  providers: [InsertNoteService, UpdateNoteService, DeleteNoteService, getNoteService],
})
export class AppModule {}
