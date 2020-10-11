import Debug from 'debug';
import { TaskManagerLocation } from './taskManagerLocation';

const debug = Debug('app:model:taskManagerModel');

export class TaskManagerModel {

  static getDefaultLocations(): Array<TaskManagerLocation> {
    debug('created Task Manage Location model');
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

  static getDefaultSelectedOptions(): {} {
    return {
      selectedLocation: 'Taylor House',
      selectedCaseworker: 'All',
    };
  }


}
