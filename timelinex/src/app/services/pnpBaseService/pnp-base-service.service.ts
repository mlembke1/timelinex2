import { Injectable } from "@angular/core";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
@Injectable()

export class PnPBaseService {
  constructor() {
    sp.setup({ spfxContext: window['webPartContext'] })
  }

  // You Need to Check this out
  // https://pnp.github.io/pnpjs/sp-addinhelpers/

  public getDataByListName(url: string): Promise<any> {
    const listName = url.split("Lists/")[1].split("/")[0];
    return new Promise(async (resolve, reject) => {
      if (sp !== null && sp !== undefined) {
        const items = sp.web.lists.configure({ credentials: 'include' }).getByTitle(listName).items.getAll();
        resolve(items);
      } else {
        reject('Failed getting list data...');  
      }
    });
  }
}