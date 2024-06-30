import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/schemas/note.schema';
import { deleteNoteDto } from 'src/dto/deleteNoteDto';
import { INoteRepository } from 'src/repositories/I-note-repository';

@Injectable()
export class DeleteNoteService {

    private readonly noteRepo: INoteRepository
  
    constructor(@Inject('INoteRepository') noteRepo: INoteRepository) {
      this.noteRepo = noteRepo;
    }
  
    async delete(deleteDto: deleteNoteDto): Promise<string | Note> {
      return await this.noteRepo.deleteNote(deleteDto.id)
    }


}
