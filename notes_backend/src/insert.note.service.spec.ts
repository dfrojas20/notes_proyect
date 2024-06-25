
import { insertNoteDto } from "./dto/insertNoteDto";
import { INoteRepository } from "./repositories/I-note-repository";
import { InsertNoteService } from "./services/insert.note.service";

class mockNoteRepository implements INoteRepository {
    
    async crearNota(nota: insertNoteDto): Promise<string | insertNoteDto> {
        return nota
    }
    
}


describe('CrearNotaService', () => {
    test('test_create_note', async () => {
      //Arrange
      const insertNotaService = new InsertNoteService(new mockNoteRepository())
      const dto = new insertNoteDto('test note title', 'test note content') 

  
      //Act
      const result = await insertNotaService.insert(dto);
  
      //Assert
      expect(result instanceof insertNoteDto).toBeTruthy();
    });

});