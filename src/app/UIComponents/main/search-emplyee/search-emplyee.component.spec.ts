import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmplyeeComponent } from './search-emplyee.component';

describe('SearchEmplyeeComponent', () => {
  let component: SearchEmplyeeComponent;
  let fixture: ComponentFixture<SearchEmplyeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEmplyeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEmplyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
