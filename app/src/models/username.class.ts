export class UserName {
  firstName: string;
  lastName: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
