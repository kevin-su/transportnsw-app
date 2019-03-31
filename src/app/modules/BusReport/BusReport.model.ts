export class BusReportItemModel {
  busId: string;
  routeVariant: string;
  deviationFromTimetable: number;
}

export class BusReportModel {
  organisation: string;
  date: string;
  busData: BusReportItemModel[];
  notes? : string;
}

export class BusReportDataModel {
  data: BusReportModel[];
}

export class StatusModel {
  status: string;
  statusName: string;
}

export class BusReportViewModel extends BusReportModel  {
  isCollapsed?: boolean;
}

export class BusReportViewDataModel {
  reports: BusReportViewModel[];
}
