import { Controller, Delete, Get, Post, Put, Query, Req, Res } from '@nestjs/common';
import { InsertNoteService } from './services/insert.note.service';
import { UpdateNoteService } from './services/update.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { getNoteService } from './services/get.note.service';
import { Response, Request, query } from 'express';
import { insertNoteDto } from './dto/insertNoteDto';
import { deleteNoteDto } from './dto/deleteNoteDto';
import { updateNoteDto } from './dto/updateNoteDto';
import { Note } from './schemas/note.schema';


@Controller()
export class AppController {
  constructor(private readonly InsertNoteService: InsertNoteService,
              private readonly getNoteService: getNoteService,
              private readonly updateNoteService: UpdateNoteService,
              private readonly deleteNoteService: DeleteNoteService
  ) {}


  @Post('/notes')
  async postNote(@Res() res: Response, @Req() req: Request): Promise<any>{
    const {
      title,
      content 
    } = req.body

    let noteDto = new insertNoteDto(title,content)
    
    let note = await this.InsertNoteService.insert(noteDto)
    if (note instanceof insertNoteDto){
      return(res.status(200).json(note))
    }else{
      return(res.status(404).json(note))
    }
    
  }

  @Put('/notes')
  async update(@Res() response: Response, @Req() request: Request): Promise<any> {
    const { title, content } = request.body
    const { old_title, old_content} = request.query



      let note = await this.updateNoteService.update(
        new updateNoteDto(
          old_title !== undefined ? String(old_title): '',
          old_content !== undefined ? String(old_content): '',

          '',
          title,
          content,
          undefined
      )
    ) 
      if (note instanceof Note) {
        return(response.status(200).json(note))
      }
      return response.status(404).json(note)

  
    //return(response.status(404).json({"message": "bad request(undefined object)"}))
}

  @Delete('/notes')
    async delete(@Res() response: Response, @Req() request: Request): Promise<any> {
      const { title } = request.query
  
      if (title !== undefined) {
        let note = await this.deleteNoteService.delete(new deleteNoteDto(title.toString())) 
        if (note instanceof Note) {
          return(response.status(200).json(note))
        }
        return response.status(404).json(note)
      }
    
      return(response.status(404).json({"message": "bad request(undefined object)"}))
  }


  @Get('/notes')
  async getHello(@Res() response: Response, @Req() request: Request): Promise<any> {
    const { id_note } = request.query

    if (id_note !== undefined) {
      return( response.json({param: id_note}) )
    }

    let notes = await this.getNoteService.getAll()
    if (notes[0] instanceof Note) return(response.status(200).json(notes))

    return(response.status(404).json(notes))
  }

}
