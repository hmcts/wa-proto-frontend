import Debug from 'debug';

const debug = Debug('app:model:taskManager:location');

export class Location {

  constructor(public text: string, public selected?: boolean) {
    debug(`location ${text} model created...`);
  }

  static getDefaultLocations(): Array<Location> {
    return [
      new Location('Birmingham'),
      new Location('Bradford'),
      new Location('Glasgow'),
      new Location('Hatton Cross'),
      new Location('Manchester'),
      new Location('Newcastle'),
      new Location('Newport'),
      new Location('Taylor House', true),
    ];
  }


}
