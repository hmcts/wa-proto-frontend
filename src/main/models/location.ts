import Debug from 'debug';

const debug = Debug('app:model:location');

export class Location {
  constructor(public index: number, public name: string) {
    debug(`Location ${name} model created...`);
  }

}
