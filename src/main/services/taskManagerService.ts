import { MyModel } from '../models/myModel';

export function getLocationsForDropDownMenu(selectedOption: string): Array<{}> {
  return MyModel.getAllLocations().map(l => {
    if (selectedOption === l.name) {
      return {
        text: l.name,
        selected: true,
      };
    } else {
      return {
        text: l.name,
      };
    }
  });
}

export function getCaseWorkersForDropDownMenu(selectedOption: string): Array<{}> {

  const allCaseWorkers = MyModel.getAllCaseworker().map(cw => {
    return {
      text: cw.name,
    };
  });

  const allOptions = [
    {
      text: 'All',
    },
    ...allCaseWorkers,
    {
      text: 'Unassigned',
    },
  ];

  return allOptions.map(o => {
    if (o.text === selectedOption) {
      return {
        text: o.text,
        selected: true,
      };
    } else return {
      text: o.text,
    };
  });

}

