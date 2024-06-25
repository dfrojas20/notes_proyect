import { Inject, Injectable } from '@nestjs/common';
import { insertNoteDto } from 'src/dto/insertNoteDto';
import { INoteRepository } from 'src/repositories/I-note-repository';


@Injectable()
export class InsertNoteService {

  private readonly noteRepo: INoteRepository
  
  constructor(@Inject('INoteRepository') noteRepo: INoteRepository) {
    console.log(noteRepo)
    this.noteRepo = noteRepo;
  }

  async insert(insertNoteDto: insertNoteDto): Promise<string | insertNoteDto> {
    console.log(insertNoteDto)
    return await this.noteRepo.crearNota(insertNoteDto)
  }


}
