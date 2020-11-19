import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListService } from '../../services/listService/list-service.service';

@Component({
  selector: 'app-timelinex-web-part',
  templateUrl: './timelinex-web-part.component.html',
  styleUrls: ['./timelinex-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelinexWebPartComponent implements OnInit {

  calendarURLInput: string = '';

  constructor(private listService: ListService) { }

  ngOnInit() { }

  addCalendar = () => {
    // Call service here with this.calendarURLInput;
    // You probably need to massage the url a bit here... maybe not...
    this.listService.getLists(this.calendarURLInput).subscribe((result: any) => {
      console.log('GET LISTS RESULTS', result);
      this.calendarURLInput = '';
    })
  }

}
