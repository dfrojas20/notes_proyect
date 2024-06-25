import { Schema, model, connect } from 'mongoose';
import { INoteRepository } from './I-note-repository';
import { insertNoteDto } from 'src/dto/insertNoteDto';
import { Injectable } from '@nestjs/common';

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
