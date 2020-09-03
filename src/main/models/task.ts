import Debug from 'debug';

const debug = Debug('app:model:task');

export class Task {
  constructor(private readonly caseRef: string, public caseName: string, public caseCategory: string,
    public location: string, public taskName: string, public date: string) {
    debug(`task ${caseRef} model created...`);
    this.caseRef = caseRef;
  }

  get getCaseRef() {
    return this.caseRef;
  }

}
