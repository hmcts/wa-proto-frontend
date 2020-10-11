import Debug from 'debug';

const debug = Debug('app:model:taskManager:location');

export class TaskManagerLocation {

  constructor(public text: string, public selected?: boolean) {
    debug(`TaskManagerLocation ${text} model created...`);
  }

}
