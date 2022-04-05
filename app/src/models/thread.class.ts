
export class Thread {
    imgUrl!: string;
    text!: string;
    creator!: string;
    date!: string;

    
    constructor(obj?: any) {
      this.imgUrl = obj ? obj.imgUrl : '';
      this.text = obj ? obj.text : '';
      this.creator = obj ? obj.creator : '';
      this.date = obj ? obj.date : '';
      
    }
  
    public toJson() {
      return {
        imgUrl: this.imgUrl,
        text: this.text,
        creator: this.creator,
        date: this.date,
        
      };
    }
  }
  