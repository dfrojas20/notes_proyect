import { Schema, model, connect } from 'mongoose';
import { INoteRepository } from './I-note-repository';
import { insertNoteDto } from 'src/dto/insertNoteDto';
import { Injectable } from '@nestjs/common';
import { Note } from 'src/schemas/note.schema';
import { updateNoteDto } from 'src/dto/updateNoteDto';

// 1. Create an interface representing a document in MongoDB.
interface INote {
    title: string;
    last_updated_date: Date;
    content: string;
}

// 2. Create a Schema corresponding to the document interface.
const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  last_updated_date: { type: Date },
  content: String
});

// 3. Create a Model.
@Injectable()
export class mongoNoteRepository implements INoteRepository{

    constructor() {}
    async updateNote(nota: updateNoteDto): Promise<string | Note> {
        try{
          const NoteModel = model<INote>('Note', noteSchema); 
          const filter = { title: nota.old_title, content: nota.old_content };
          const update = { title: nota.title, content: nota.content, last_updated_date: nota.last_updated_date};

          
          // The result of `findOneAndUpdate()` is the document _before_ `update` was applied
          await NoteModel.findOneAndUpdate(filter, update);// { name: 'Jean-Luc Picard', _id: ObjectId('000000000000000000000000') }
          
          const updatedNote = await NoteModel.findOne(update);
          return new Note(updatedNote.title, updatedNote.content, updatedNote.last_updated_date)
        }catch (error){
            return error
        }
    }

    async deleteNote(idNote: string): Promise<string | Note> {
        try{
            const NoteModel = model<INote>('Note', noteSchema); 
            const filter = { title: idNote };
            
            // The result of `findOneAndUpdate()` is the document _before_ `update` was applied
            const deletedNote = await NoteModel.findOneAndDelete(filter);// { name: 'Jean-Luc Picard', _id: ObjectId('000000000000000000000000') }
            
            return new Note(deletedNote.title, deletedNote.content, deletedNote.last_updated_date)
          }catch (error){
              return error
          }
    }

    async getAllNotes(): Promise<string | Note[]> {
        try {
            const NoteModel = model<INote>('Note', noteSchema); 
            await connect(process.env.DB_HOST); 
            
            const mongo_notes = await NoteModel.find()
            const notes: Note[] = []

            mongo_notes.forEach(note => {
                notes.push(new Note(note.title, note.content, note.last_updated_date))
            });
            
            return notes

        } catch (error) {
            return error 
        }
    }
    
    async crearNota(nota: insertNoteDto): Promise<string | insertNoteDto> {

        try {
            const Note = model<INote>('Note', noteSchema); 

            await connect(process.env.DB_HOST);

            const user = new Note({
                    title: nota.name,
                    last_updated_date: new Date(),
                    content: nota.content
            });
            await user.save();
            return nota
        
        } catch (error) {
           console.log(error)
           return error 
        }

    }


}
