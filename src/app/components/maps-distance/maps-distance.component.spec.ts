import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsDistanceComponent } from './maps-distance.component';

describe('MapsDistanceComponent', () => {
  let component: MapsDistanceComponent;
  let fixture: ComponentFixture<MapsDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
