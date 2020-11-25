import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListService } from 'src/app/services/listService/list-service.service';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-timelinex-web-part',
  templateUrl: './timelinex-web-part.component.html',
  styleUrls: ['./timelinex-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelinexWebPartComponent implements OnInit {

  calendarURLInput: string = '';
  events: any;

  constructor(
    private listService: ListService,
    private notificationService: NzNotificationService
    ) { }

  ngOnInit() { }

  addCalendar = () => {
    if (this.calendarURLInput.indexOf('calendar.aspx') !== -1) {
      this.listService.getLists(this.calendarURLInput).then((response: any[]) => {
        this.events = response.map((event: any) => {
            event.EventDate = moment(event.EventDate).format('YYYY-MM-DD'),
            event.EndDate = moment(event.EndDate).format('YYYY-MM-DD')
            return event;
        });
        this.calendarURLInput = '';
      });
    } else {
      this.notificationService.create(
        'warning',
        'Invalid Calendar URL',
        'Please enter the url of a SharePoint Calendar.'
      )
    }
  }

}
