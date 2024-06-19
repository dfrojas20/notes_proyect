import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';

@Injectable()
export class getNoteService {

    constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}
    
    async getAll(): Promise<Note[]> {
        return this.noteModel.find().exec();
    }
    
    
}
