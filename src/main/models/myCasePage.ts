import Debug from 'debug';

const debug = Debug('app:model:myCasePage');

export class MyCasePage {
  constructor(public pageName: string, public stages: Array<Record<string, string>>) {
    debug(`page ${pageName} model created with stages: ${JSON.stringify(stages, null, '\t')}`);
    this.pageName = pageName;
    this.stages = stages;
  }

}
