import Debug from 'debug';

const debug = Debug('app:model:taskManager:location');

export class TaskManagerLocation {

  constructor(public text: string, public selected?: boolean) {
    debug(`TaskManagerLocation ${text} model created...`);
  }

  static getDefaultLocations(): Array<TaskManagerLocation> {
    return [
      new TaskManagerLocation('Birmingham'),
      new TaskManagerLocation('Bradford'),
      new TaskManagerLocation('Glasgow'),
      new TaskManagerLocation('Hatton Cross'),
      new TaskManagerLocation('Manchester'),
      new TaskManagerLocation('Newcastle'),
      new TaskManagerLocation('Newport'),
      new TaskManagerLocation('Taylor House', true),
    ];
  }


}
