import Debug from 'debug';
import { TaskManagerLocation } from './taskManagerLocation';
import { TaskManagerCaseworker } from './taskManagerCaseWorker';
import { MyModel } from '../myModel';

const debug = Debug('app:model:taskManagerModel');
export class TaskManagerModel {

  static getLocations(selectedOption: string): Array<TaskManagerLocation> {
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

  static getCaseworkers(selectedOption: string): Array<TaskManagerCaseworker> {
    const caseworkers: Array<TaskManagerCaseworker> = MyModel.getAllCaseworker().map(caseworker => {
      return new TaskManagerCaseworker(caseworker.name);
    });

    const allOptions = [
      {
        text: 'All',
      },
      ...caseworkers,
      {
        text: 'Unassigned',
      },
    ];

    return allOptions.map(option => {
      if (option.text === selectedOption) {
        return new TaskManagerCaseworker(option.text, true);
      } else {
        return new TaskManagerCaseworker(option.text);
      }
    });
  }

}
