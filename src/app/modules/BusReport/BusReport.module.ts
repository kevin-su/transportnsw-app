import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';
import { BusReportComponent } from './BusReport.component';
import { BusReportService } from './BusReport.service';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    BusReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SafePipeModule
  ],
  exports: [
    BusReportComponent
  ],
  providers: [
    BusReportService
  ]
})
export class BusReportModule {}
