import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';
import { INoteRepository } from 'src/repositories/I-note-repository';

@Injectable()
export class getNoteService {

    private readonly noteRepo: INoteRepository

    constructor(@Inject('INoteRepository') noteRepo: INoteRepository) {
        this.noteRepo = noteRepo;
      }
    
    async getAll(): Promise<Note[] | string> {
        return await this.noteRepo.getAllNotes()
    }
    
    
}
