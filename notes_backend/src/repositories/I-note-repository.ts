import { insertNoteDto } from "src/dto/insertNoteDto"
import { Note } from "src/schemas/note.schema"

export interface INoteRepository{
    crearNota(nota: insertNoteDto): Promise<insertNoteDto | string>

    getAllNotes(): Promise< Note[] | string>
}