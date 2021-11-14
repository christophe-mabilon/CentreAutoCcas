export class User {
  constructor(
    public id:number,
    public username:string,
    public password:string,
    public passwordconfirm:string,
    public email:string,
    public lastName:string,
    public firstName:string,
    public phoneNumber:string,
    public siret:string,
    public title:string,
    public society:string,
    public adresse:string,
    public codePostal:string,
    public ville:string,
    public roles:[],
    public updatedOn:Date){}
}
