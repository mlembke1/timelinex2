import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListService } from 'src/app/services/listService/list-service.service';
import { PnPBaseService } from 'src/app/services/pnpBaseService/pnp-base-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timelinex-web-part',
  templateUrl: './timelinex-web-part.component.html',
  styleUrls: ['./timelinex-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelinexWebPartComponent implements OnInit {

  calendarURLInput: string = '';
  events: any;

  constructor(private pnpService: PnPBaseService, private listService: ListService) { }

  ngOnInit() { }

  addCalendar = () => {
    // Call service here with this.calendarURLInput;
    // You probably need to massage the url a bit here... maybe not...
    this.listService.getLists(this.calendarURLInput).then((response) => {
      console.log('getListsFromSP Response', response);
      this.events = response.map((event: any) => {
        return {
          start: moment(event.EventDate).format('YYYY-MM-DD'),
          end: moment(event.EndDate).format('YYYY-MM-DD'),
          title: event.Title,
          recurring: event.fRecurrence,
          allDayEvent: event.fAllDayEvent
        }
      })
      this.calendarURLInput = '';
    });
  }

}
