import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusReportComponent } from './BusReport.component';
import { BusReportService } from './BusReport.service';

@NgModule({
  declarations: [
    BusReportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BusReportComponent
  ],
  providers: [
    BusReportService
  ]
})
export class BusReportModule {}
