import Debug from 'debug';
import { TaskManagerLocation } from './taskManagerLocation';
import { TaskManagerCaseworker } from './taskManagerCaseWorker';
import { MyModel } from '../myModel';

const debug = Debug('app:model:taskManagerModel');

export class TaskManagerModel {

  static getDefaultLocations(selectedOption: string): Array<TaskManagerLocation> {
    debug('created Task Manage Location model');
    return MyModel.getAllLocations().map(location => {
      if (location.name === selectedOption) {
        return new TaskManagerLocation(location.name, true);
      } else {
        return new TaskManagerLocation(location.name);
      }
    });
  }

  static getDefaultSelectedOptions(): {} {
    return {
      selectedLocation: 'Taylor House',
      selectedCaseworker: 'All',
    };
  }

  static getDefaultCaseworkers(): Array<TaskManagerCaseworker> {
    return [
      new TaskManagerCaseworker('All', true),
      new TaskManagerCaseworker('Bisa Butler'),
      new TaskManagerCaseworker('Amanda Mc Donald'),
      new TaskManagerCaseworker('Simone Harley'),
      new TaskManagerCaseworker('Unassigned'),
    ];
  }


}
