import Debug from 'debug';

const debug = Debug('app:model:casworker');

export class Caseworker {
  constructor(public index: number, public name: string) {
    debug(`Caseworker ${name} model created...`);
  }

}
