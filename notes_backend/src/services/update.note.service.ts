import { Inject, Injectable } from '@nestjs/common';
import { Note } from 'src/schemas/note.schema';
import { updateNoteDto } from 'src/dto/updateNoteDto';
import { INoteRepository } from 'src/repositories/I-note-repository';

@Injectable()
export class UpdateNoteService {

  private readonly noteRepo: INoteRepository

  constructor(@Inject('INoteRepository') noteRepo: INoteRepository) {
    this.noteRepo = noteRepo;
  }

    async update(updateDto: updateNoteDto): Promise<Note | string > {
  
      return await this.noteRepo.updateNote(new updateNoteDto(
          updateDto.old_title,
          updateDto.old_content,
          
          updateDto.id,
          updateDto.title,
          updateDto.content,
          new Date() 
      ))

    }
    
}
