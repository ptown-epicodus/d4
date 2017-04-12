/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarPlotComponent } from './bar-plot.component';

describe('BarPlotComponent', () => {
  let component: BarPlotComponent;
  let fixture: ComponentFixture<BarPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
