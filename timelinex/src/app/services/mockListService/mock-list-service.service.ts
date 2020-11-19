import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MockListService {
  public getLists(siteURL: string): Observable<any[]> {
    return of([{
          key: siteURL + "|aaa-bbb-ccc-ddd|List Alpha",
          text: "List Alpha"
        },
        {
          key: siteURL + "|eee-fff-ggg-hhh|List Bravo",
          text: "List Bravo"
        },
        {
          key: siteURL + "|xxx-yyy-zzz|List Charlie",
          text: "List Charlie"
        }]);
  }

  public getListItemsFromMockup(list: any): Promise<any> {
    return new Promise((resolve, reject) => {
      list.ListItems = [];
  
      let numOfListItems = Math.floor(Math.random() * 10) + 1; //Generate a random number of list items since we're ont he mockup
  
      for (let i = 0; i < numOfListItems; i++) {
        list.ListItems.push({
          ListItemId: "ID#" + i.toString(),
          ListItemFields: [
            {
              FieldName: "Field 1",
              FieldValue: "Value 1"
            },
            {
              FieldName: "Field 2",
              FieldValue: "Value 2"
            },
            {
              FieldName: "Field 3",
              FieldValue: "Value 3"
            }
          ]
        });
      }
  
      setTimeout(() => {
        resolve(list);
      }, 250);
    });
  }
}
