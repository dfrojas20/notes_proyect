
export class Note {
  title: string;
  last_updated_date: Date;
  content: string;

  constructor(title: string, content: string, last_date){
    this.title = title
    this.content = content
    this.last_updated_date = last_date   
  }
}
