import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';
import { insertNoteDto } from 'src/dto/insertNoteDto';

@Injectable()
export class InsertNoteService {
  
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async insert(insertNoteDto: insertNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(
      {title: insertNoteDto.name,
       last_updated_date: new Date(), 
       content: insertNoteDto.content});
    return createdNote.save();
  }


}
