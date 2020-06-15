import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInterComponent } from './upload-inter.component';

describe('UploadInterComponent', () => {
  let component: UploadInterComponent;
  let fixture: ComponentFixture<UploadInterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadInterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
