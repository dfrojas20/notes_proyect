import { insertNoteDto } from "src/dto/insertNoteDto"

export interface INoteRepository{
    crearNota(nota: insertNoteDto): Promise<insertNoteDto | string>
}