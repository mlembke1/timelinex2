import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MockListService } from '../mockListService/mock-list-service.service';
import { Observable, of } from 'rxjs';
import { PnPBaseService } from '../pnpBaseService/pnp-base-service.service';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  constructor(
    private mockListService: MockListService,
    private pnpService: PnPBaseService,
    private httpClient: HttpClient
    ) { }
  
  public getLists(siteURL?: string): Promise<any> {
    if (!siteURL) {
        // resolve to empty since no url was supplied
        return new Promise(null);
    }

    //Using local workbench - fake it 
    if (window.location.href.indexOf('localhost') !== -1) {
        return this.mockListService.getListItemsFromMockup(siteURL);
    } else {
        return this.pnpService.getDataByListName(siteURL);
    }
  }

  private sanitizeCalendarUrl(url) {
    let index = url.indexOf('/Lists/');
    let index2 = url.indexOf('/default.aspx');
    let index3 = url.indexOf('/SitePages/');
    if (index != -1) url = url.substring(0, index);
    if (index2 != -1) url = url.substring(0, index2);
    if (index3 != -1) url = url.substring(0, index3);
    return url;
  }

  public getListsFromSP(siteURL: string): any {
    //Query SP via REST to get the lists available to the end user.
    //BaseTemplate 106 = Calendar.  Sort by the title for convenience
    //All list template IDs: https://docs.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-wssts/8bf797af-288c-4a1d-a14b-cf5394e636cf
    //spHttpClient does a brand new call to SP, which is CORS compliant.  Similar to a CDN call - this also bakes in our authentication headers and tokens from the webpart context.
    const url = this.sanitizeCalendarUrl(siteURL) + "/_api/web/lists?$filter=BaseTemplate eq 106";
    const requestOptions = {
      headers: new HttpHeaders().set('credentials', 'include')
    };
    return this.httpClient.get(url, requestOptions)
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
