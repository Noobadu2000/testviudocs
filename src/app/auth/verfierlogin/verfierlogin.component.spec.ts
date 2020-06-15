import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfierloginComponent } from './verfierlogin.component';

describe('VerfierloginComponent', () => {
  let component: VerfierloginComponent;
  let fixture: ComponentFixture<VerfierloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfierloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfierloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
