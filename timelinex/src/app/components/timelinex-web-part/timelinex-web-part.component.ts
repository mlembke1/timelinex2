import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListService } from '../../services/listService/list-service.service';
import { sp } from '@pnp/sp/presets/all';
import { PnPBaseService } from 'src/app/services/pnpBaseService/pnp-base-service.service';

@Component({
  selector: 'app-timelinex-web-part',
  templateUrl: './timelinex-web-part.component.html',
  styleUrls: ['./timelinex-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelinexWebPartComponent implements OnInit {

  calendarURLInput: string = '';

  constructor(private listService: ListService, private pnpService: PnPBaseService) { }

  ngOnInit() { 
    Array.from(document.getElementsByTagName('iframe')).forEach(function(el: any){
      if (el.id.indexOf('dom-isolated-webpart') !== -1) {
        console.log('SHOULD BE SETTING IFRAME HEIGHT.........')
        el['style']="height: 30em;";
      }
    });
  }

  addCalendar = () => {
    // Call service here with this.calendarURLInput;
    // You probably need to massage the url a bit here... maybe not...
    this.listService.getListsFromSP(this.calendarURLInput).subscribe((result: any) => {
      console.log('GET LISTS RESULTS', result);
      this.calendarURLInput = '';
    })
  }

}
