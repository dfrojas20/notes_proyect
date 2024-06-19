import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';
import { deleteNoteDto } from 'src/dto/deleteNoteDto';

@Injectable()
export class DeleteNoteService {

    constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

    async delete(deleteNoteDto: deleteNoteDto): Promise<any>{

        let note: Note | PromiseLike<Note>
        try{
            note = this.noteModel.findByIdAndDelete(deleteNoteDto.id)
            return note
        } catch (e){
          return e
        }
    }


}
