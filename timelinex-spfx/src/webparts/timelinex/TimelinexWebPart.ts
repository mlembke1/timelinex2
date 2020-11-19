import { UrlQueryParameterCollection, Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'TimelinexWebPartStrings';

/** Include Angular Elements JS and Style */
import '../../../../timelinex/dist/timelinex/bundle';
require('../../../../timelinex/dist/timelinex/styles.css');

export interface ITimelinexWebPartProps {
  description: string;
}

export default class TimelinexWebPart extends BaseClientSideWebPart<ITimelinexWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<app-timelinex-web-part></app-timelinex-web-part>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
