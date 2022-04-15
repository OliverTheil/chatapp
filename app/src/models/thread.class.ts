export class Thread {
  imgUrl!: any;
  text!: string;
  creator!: string;
  date!: string;
  dateInMs!: number;
  bold!: boolean;
  italic!: boolean;
  code!: boolean;

  constructor(obj?: any) {
    this.imgUrl = obj ? obj.imgUrl : '';
    this.text = obj ? obj.text : '';
    this.creator = obj ? obj.creator : '';
    this.date = obj ? obj.date : '';
    this.dateInMs = obj ? obj.dateInMs : '';
    this.bold = obj ? obj.bold : '';
    this.italic = obj ? obj.italic : '';
    this.code = obj ? obj.code : '';
  }

  public toJson() {
   
    return {
      imgUrl: this.imgUrl,
      text: this.text,
      creator: this.creator,
      date: this.date,
      dateInMs: this.dateInMs,
      bold: this.bold,
      italic: this.italic,
      code: this.code,
    };
  }
}
