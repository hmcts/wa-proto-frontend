

import Debug from 'debug';

const debug = Debug('app:model:taskManager:taskManagerCaseworker');

export class TaskManagerCaseworker {

  constructor(public text: string, public selected?: boolean) {
    debug(`taskManagerCaseworker ${text} model created...`);
  }

}
