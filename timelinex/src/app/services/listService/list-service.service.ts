import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MockListService } from '../mockListService/mock-list-service.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  constructor(
    private mockListService: MockListService,
    private httpClient: HttpClient
    ) { }
  
  public getLists(siteURL?: string): Observable<any> {
    if (!siteURL) {
        // resolve to empty since no url was supplied
        return of(null);
    }

    //Using local workbench - fake it 
    if (window.location.href.indexOf('localhost') !== -1) {
        return this.mockListService.getLists(siteURL);
    } else {
        return this.getListsFromSP(siteURL);
    }
  }

  public getListsFromSP(siteURL: string): any {
    //Query SP via REST to get the lists available to the end user.
    //BaseTemplate 106 = Calendar.  Sort by the title for convenience
    //All list template IDs: https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-wssts/8bf797af-288c-4a1d-a14b-cf5394e636cf
    //spHttpClient does a brand new call to SP, which is CORS compliant.  Similar to a CDN call - this also bakes in our authentication headers and tokens from the webpart context.
    const url = siteURL + "/_api/web/lists?$filter=BaseTemplate eq 106&$select=Id,Title,ParentWebUrl&$orderby=Title asc";
    this.httpClient.get(url).subscribe((response) => {
      console.log('getListsFromSP Response', response);
    });
      //   let returnSPLists: any[] = [];
      //   result.value.forEach(element => {
      //   returnSPLists.push({
      //     key: [element.ParentWebUrl, element.Id, element.Title].join("|"),
      //     text: element.Title
      //   });
      // });
  }

  // public getListItems(wpLists: any[]): Promise<any[] | void> {
  //   if (wpLists.length == 0) { return Promise.resolve(); }

  //   let allListItemPromises: Promise<any>[] = [];

  //   //Using local workbench - fake it 
  //   if (Environment.type == EnvironmentType.Local) {
  //       //return SPListItemServiceMockup.getListItemsFromMockup();
  //       wpLists.map((listInfo, idx) => {
  //           //allListItemPromises.push(this.getListItemsFromSP(listInfo));
  //           allListItemPromises.push(this.mockListService.getListItemsFromMockup(listInfo));
  //       });
  //   }
  //   else {        
  //       wpLists.map((listInfo, idx) => {
  //           allListItemPromises.push(this.getListItemsFromSP(listInfo));
  //       });
  //   }
  //   return Promise.all(allListItemPromises);
  // }

  // private getListItemsFromSP(list: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //       this.wpContext.spHttpClient.get("https://socom.sharepoint-mil.us" + list.ParentWebUrl + "/_api/web/lists/GetByTitle('" + list.Title + "')/items?$select=*,Duration,RecurrenceData", SPHttpClient.configurations.v1).then((response) => {
  //           response.json().then((result) => {
  //               list.ListItems = [];

  //               result.value.forEach(spListItem => {
  //                   let listItemFieldValues: any[] = [];
  //                   Object.keys(spListItem).forEach(field => {
  //                       listItemFieldValues.push({
  //                           FieldName: field,
  //                           FieldValue: spListItem[field]
  //                       });
  //                   });

  //                   list.ListItems.push({
  //                       ListItemId: spListItem["Id"],
  //                       ListItemFields: listItemFieldValues
  //                   });
  //               });
  //               resolve(list);
  //           });
  //       });
  //   });
  // }
}
