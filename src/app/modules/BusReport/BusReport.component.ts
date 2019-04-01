import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { BusReportService } from './BusReport.service';
import {
  BusReportViewDataModel,
  BusReportViewModel,
  StatusModel
} from './BusReport.model';

@Component({
  selector: 'bus-report',
  templateUrl: './BusReport.component.html',
  styleUrls: ['./BusReport.component.scss']
})
export class BusReportComponent {
  notesForm = [];
  viewData: BusReportViewDataModel = {
    reports: [] as BusReportViewModel[]
  }
  constructor(
    private formBuilder: FormBuilder,
    private BusReportService: BusReportService
  ) {

  }

  ngOnInit() {
    return this.init();
  }

  init() {
    return this.getReports();
  }

  initForm(i, data) {
    this.notesForm[i] = this.formBuilder.group({
      notes: [data.notes || '', Validators.required]
    });
  }

  getReports() {
    return this.BusReportService.getReports()
      .subscribe((data) => {
        return this.viewData.reports = data.map((item, i) => {
          const newItem: BusReportViewModel = item;
          newItem.isCollapsed = true;

          this.initForm(i, newItem);
          return newItem;
        });
      });
  }

  handleViewReportBy(org: string) {
    const data = this.BusReportService.getReportByOrg(org);
    this.viewData.reports =
      this.viewData.reports.map((item) => {
        if (item.organisation === data.organisation) {
          item.isCollapsed = !item.isCollapsed;
          if (!item.isCollapsed) {
            item.busData = this.getViewBusData(data.busData);
          } else {
            item.busData = [];
          }
        }
        return item;
      });
  }

  getViewBusData(data) {
    return data.map((item) => {
      const routeVariant: string[] = item.routeVariant.split(' ');
      routeVariant[0] = `<span class="highlight">${routeVariant[0]}</span>`;
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

  onSubmit(org: string, data) {
    const updatedItem = this.BusReportService.postReportNotes(
      org,
      data.notes
    );
    this.viewData.reports = this.viewData.reports.map(function(item) {
      if (updatedItem.organisation === item.organisation) {
        item.notes = updatedItem.notes;
      }
      return item;
    })
  }
}
