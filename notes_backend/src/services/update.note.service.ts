import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';
import { updateNoteDto } from 'src/dto/updateNoteDto';

@Injectable()
export class UpdateNoteService {

    constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

    async update(updateNoteDto: updateNoteDto): Promise<any> {
      try {            
        const updatedNote = this.noteModel.findByIdAndUpdate(
            {_id: updateNoteDto.id},
            {title: updateNoteDto.name,
             last_updated_date: new Date(), 
             content: updateNoteDto.content}
          );
        return updatedNote
      } catch (error) {
        console.log(error)
        return error
      }

    }
    
}
