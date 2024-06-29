import { insertNoteDto } from "src/dto/insertNoteDto"
import { updateNoteDto } from "src/dto/updateNoteDto"
import { Note } from "src/schemas/note.schema"

export interface INoteRepository{
    crearNota(nota: insertNoteDto): Promise<insertNoteDto | string>

    getAllNotes(): Promise< Note[] | string>

    updateNote(nota: updateNoteDto): Promise< Note | string> 

    deleteNote(idNote: string): Promise< Note | string> 
}