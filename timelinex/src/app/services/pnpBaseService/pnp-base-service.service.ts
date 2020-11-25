import { Injectable } from "@angular/core";
import { sp } from "@pnp/sp/presets/all";
import { Web } from '@pnp/sp/webs';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
@Injectable()

export class PnPBaseService {
  constructor() {
    sp.setup({ spfxContext: window['webPartContext'] })
  }

  public getDataByListName(url: string): Promise<any> {
    const listName = url.split("Lists/")[1].split("/")[0];
    const domain = window['webPartContext'].pageContext.web.absoluteUrl.split('/sites')[0];
    const site = url.split('sites/')[1].split('/Lists')[0];
    const webUrl = `${domain}/sites/${site}`;
    const web = Web(webUrl);
    return new Promise(async (resolve, reject) => {
      if (web !== null && web !== undefined) {
        const items = web.lists.configure({ credentials: 'include' }).getByTitle(listName).items.getAll();
        resolve(items);
      } else {
        reject('Failed getting list data...');  
      }
    });
  }

}