
import { insertNoteDto } from "./dto/insertNoteDto";
import { INoteRepository } from "./repositories/I-note-repository";
import { Note } from "./schemas/note.schema";
import { InsertNoteService } from "./services/insert.note.service";

class mockNoteRepository implements INoteRepository {
    
    async getAllNotes(): Promise<string | Note[]> {
        let notes = [
            new Note('titulo 1','contenido 1', new Date() ),
            new Note('titulo 2','contenido 2', new Date() ),
            new Note('titulo 3','contenido 3', new Date() ),
           ]
       return notes
    }
    
    async crearNota(nota: insertNoteDto): Promise<string | insertNoteDto> {
        return nota
    }
    
}


describe('test CrearNotaService', () => {
    test('test creating a good note', async () => {
      //Arrange
      const insertNotaService = new InsertNoteService(new mockNoteRepository())
      const dto = new insertNoteDto('test note title', 'test note content') 

  
      //Act
      const result = await insertNotaService.insert(dto);
  
      //Assert
      expect(result instanceof insertNoteDto).toBeTruthy();
    });

});