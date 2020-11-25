import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MockListService {
  public getLists(siteURL: string): Observable<any[]> {
    return of([{
          EndDate: "2020-09-15T20:00:00Z",
          EventDate: "2020-09-15T19:00:00Z",
          Title: "testing 1",
          fAllDayEvent: false,
          fRecurrence: false
        },
        {
          EndDate: "2020-10-07T17:00:00Z",
          EventDate: "2020-10-07T16:00:00Z",
          Title: "Second One",
          fAllDayEvent: false,
          fRecurrence: false,
        },
        {
          EndDate: "2039-02-24T22:00:00Z",
          EventDate: "2020-01-09T21:00:00Z",
          Title: "RECURRING - CAL 1",
          fAllDayEvent: false,
          fRecurrence: true
        }]);
  }

  public getListItemsFromMockup(url: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          EndDate: "2020-09-15T20:00:00Z",
          EventDate: "2020-09-15T19:00:00Z",
          Title: "testing 1",
          fAllDayEvent: false,
          fRecurrence: false
        },
        {
          EndDate: "2020-10-07T17:00:00Z",
          EventDate: "2020-10-07T16:00:00Z",
          Title: "Second One",
          fAllDayEvent: false,
          fRecurrence: false,
        },
        {
          EndDate: "2039-02-24T22:00:00Z",
          EventDate: "2020-01-09T21:00:00Z",
          Title: "RECURRING - CAL 1",
          fAllDayEvent: false,
          fRecurrence: true
        }
      ])
    });
  }
}
