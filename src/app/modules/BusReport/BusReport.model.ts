export class BusReportItemModel {
  busId: string;
  routeVariant: string;
  deviationFromTimetable: number;
}

export class BusReportModel {
  organisation: string;
  date: string;
  busData: BusReportItemModel[];
}

export class BusReportDataModel {
  data: BusReportModel[];
}

export class BusReportViewDataModel {
  reports: BusReportModel[];
}
