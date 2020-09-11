import Debug from 'debug';

const debug = Debug('app:model:task');

export class Task {
  constructor(
    public caseRef: string,
    public caseName: string,
    public caseCategory: string,
    public location: string,
    public taskName: string,
    public dueDate: string,
    public dateOrder: number,
    public dateColourCode: string) {

    debug(`task ${caseRef} model created...`);

  }

}
