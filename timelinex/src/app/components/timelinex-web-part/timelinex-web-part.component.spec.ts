import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinexWebPartComponent } from './timelinex-web-part.component';

describe('TimelinexWebPartComponent', () => {
  let component: TimelinexWebPartComponent;
  let fixture: ComponentFixture<TimelinexWebPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinexWebPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinexWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
