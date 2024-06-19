import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './notes.controller';
import { InsertNoteService } from './services/insert.note.service';
import { UpdateNoteService } from './services/update.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { getNoteService } from './services/get.note.service';
import { Response, Request } from 'express';
import { insertNoteDto } from './dto/insertNoteDto';

import { Note } from './schemas/note.schema';

describe('AppController', () => {
  let appController: AppController;
  let insertNoteService: InsertNoteService;
  let updateNoteService: UpdateNoteService;
  let deleteNoteService: DeleteNoteService;
  let getNoteService: getNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
          InsertNoteService
      ],
    }).compile();

    insertNoteService = module.get<InsertNoteService>(InsertNoteService);
    appController = module.get<AppController>(AppController);
  });

  describe('postNote', () => {
    it('should insert a note and return it', async () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any as Response;

      const request = {
        body: { title: 'Test Note', content: 'Test Content' },
      } as Request;

      const result = new Note()
      const noteDto = new insertNoteDto('Test Note', 'Test Content')

      jest.spyOn(insertNoteService, 'insert').mockImplementation( async () => result)

      await appController.postNote(response, request);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ title: 'Test Note', content: 'Test Content' });

    });
  });

});
