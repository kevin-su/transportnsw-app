import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { of } from 'rxjs';
import { SafePipeModule } from 'safe-pipe';
import { BusReportComponent } from './BusReport.component';
import { BusReportService } from './BusReport.service';
import dataJSON from '../../../assets/bus-services-data.json';

describe('BusReportComponent', () => {
  let service: BusReportService;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SafePipeModule,
        HttpClientTestingModule
      ],
      declarations: [
        BusReportComponent
      ],
      providers: [
        BusReportService
      ]
    }).compileComponents();

    const { fixture, component } = setup();
    service = fixture.debugElement.injector.get(BusReportService);
    spyOn(service, 'getReports').and.returnValue( of (
      dataJSON.data
      .map((item) => {
        const bewItem = Object.assign({}, item);
        bewItem.busData = [];
        return bewItem;
      })));
    component.ngOnInit();
  }));

  function setup() {
    const fixture = TestBed.createComponent(BusReportComponent);
    return {
      fixture: fixture,
      component: fixture.debugElement.componentInstance
    };
  }

  it('should create report org', () => {
    const { fixture, component } = setup();
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;
    expect(dataJSON.data.length).toEqual(el.querySelectorAll('.header').length);
  });

  it('should create handleViewReportBy', () => {
    const org = 'Sydney Buses';
    const orgData = Object.assign({}, dataJSON.data.find(item => item.organisation === org));
    const { fixture, component } = setup();
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement;

    spyOn(service, 'getReportByOrg').and.returnValue(orgData);

    el.querySelectorAll('.header .btn-toggle')[0].click();
    fixture.detectChanges();
    expect(orgData.busData.length)
      .toEqual(el.querySelectorAll('table')[0].querySelectorAll('tbody tr').length);
  });

  it('should create getStatus', () => {
    const { component } = setup();
    const matchData = [{
        busId: "42612",
        status: 'on-time',
        statusName: 'On Time'
      },
      {
        busId: "29016",
        status: 'late',
        statusName: 'Late'
      },
      {
        busId: "88836",
        status: 'early',
        statusName: 'Early'
      },
      {
        busId: "62788",
        status: 'unknown',
        statusName: 'Unknown'
      }
    ];

    const testData = [].concat(
        dataJSON.data[0].busData,
        dataJSON.data[1].busData
      )
      .forEach((item) => {
        const foundItem = matchData.find(itm => itm.busId === item.busId);
        if (foundItem) {
          const { status, statusName } = component.getStatus(item.deviationFromTimetable);
          expect(foundItem.status).toBe(status);
          expect(foundItem.statusName).toBe(statusName);
        }
      });
  });

});
