export class updateNoteDto {
    
    old_title: string
    old_content: string
    
    id:      string
    title:    string
    content: string
    last_updated_date: Date | undefined

    constructor(old_title:string , old_content:string,id:string, title: string, content: string, last_date:Date){
   
        this.old_title = old_title
        this.old_content = old_content
        
        this.id = id
        this.title = title
        this.content = content
        this.last_updated_date = last_date
    }
}