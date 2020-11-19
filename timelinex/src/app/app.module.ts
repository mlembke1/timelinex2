import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';

import { TimelinexWebPartComponent } from './components/timelinex-web-part/timelinex-web-part.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimelinexWebPartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [TimelinexWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(TimelinexWebPartComponent, { injector: this.injector });
    customElements.define('app-timelinex-web-part', el);
  }
}
