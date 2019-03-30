import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { BusReportDataModel, BusReportModel } from './BusReport.model';

@Injectable()
export class BusReportService {
  constructor(private http: HttpClient) { }
  getReports() {
    const url = '/assets/bus-services-data.json';
    return this.http.get<BusReportDataModel>(url)
      .pipe(
        map((data) => {
          return <BusReportModel[]>data.data
            .map((item) => {
              item.busData = [];
              return item;
            });
        })
      );
  }
  getReportByOrg(org: string) {
    const url = '/assets/bus-services-data.json';
    return this.http.get<BusReportDataModel>(url)
      .pipe(
        map((data) => {
          return <BusReportModel>data.data
            .find(item => item.organisation === org);
        })
      );
  }
}
