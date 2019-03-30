import { Component } from '@angular/core';
import { BusReportService } from './BusReport.service';
import { BusReportViewDataModel } from './BusReport.model';

@Component({
  selector: 'bus-report',
  templateUrl: './BusReport.component.html',
  styleUrls: ['./BusReport.component.scss']
})
export class BusReportComponent {
  viewData: BusReportViewDataModel = {
    reports: []
  }
  constructor(
    private BusReportService: BusReportService
  ) {
    this.init();
  }

  init() {
    this.getReports();
  }

  getReports() {
    this.BusReportService.getReports()
      .subscribe((data) => {
        this.viewData.reports = data;
      });
  }

  handleViewReportBy(org: string) {
    this.BusReportService.getReportByOrg(org)
      .subscribe((data) => {
        this.viewData.reports =
          this.viewData.reports.map((item) => {
            if (item.organisation === data.organisation) {
              item.busData = data.busData;
              console.log(data.busData);
            }
            return item;
          });
        // console.log(this.viewData.reports);
      });
  }
}
