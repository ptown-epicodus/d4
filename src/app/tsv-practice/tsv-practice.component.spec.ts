import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsvPracticeComponent } from './tsv-practice.component';

describe('TsvPracticeComponent', () => {
  let component: TsvPracticeComponent;
  let fixture: ComponentFixture<TsvPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsvPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsvPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
