import Debug from 'debug';

const debug = Debug('app:model:task');

export class Task {
  constructor(public caseRef: string) {
    debug(`task ${caseRef} model created...`);
    this.caseRef = caseRef;
  }

}
