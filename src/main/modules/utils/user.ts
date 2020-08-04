import Debug from "debug";
const debug = Debug('app:user');

export class User {
  constructor(public name: String, public lastname: String) {
    debug('User class executed...');
    this.name = name;
    this.lastname = lastname;
  }

}
