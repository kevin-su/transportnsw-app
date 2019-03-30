import { Component, OnInit } from '@angular/core';
import { BusReportService } from './BusReport.service';
import { BusReportViewDataModel, StatusModel } from './BusReport.model';

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
  ) {}

  ngOnInit() {
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
    const data = this.BusReportService.getReportByOrg(org);
    this.viewData.reports =
      this.viewData.reports.map((item) => {
        if (item.organisation === data.organisation) {
          item.busData = this.getViewBusData(data.busData);
        }
        return item;
      });
  }

  getViewBusData(data) {
    return data.map((item) => {
      const routeVariant: string[] = item.routeVariant.split(' ');
      routeVariant[0] = `<span>${routeVariant[0]}</span>`;
      item.routeVariant = routeVariant.join(' ');
      Object.assign(item, this.getStatus(item.deviationFromTimetable));
      return item;
    });
  }

  getStatus(val: number) {
    let result: StatusModel = {
      status: '',
      statusName: ''
    };

    function fn(name: string) {
      var statusMapper = {
        'on-time': 'On Time',
        'late': 'Late',
        'early': 'Early',
        'unknown': 'Unknown'
      }
      return {
        status: name,
        statusName: statusMapper[name]
      };
    }

    if (typeof val !== 'number') {
      result = fn('unknown');
    } else if (val < 0) {
      result = fn('early');
    } else if (val > 0 && val < 300) {
      result = fn('on-time');
    } else if (val > 300) {
      result = fn('late');
    }

    return result;
  }
}
