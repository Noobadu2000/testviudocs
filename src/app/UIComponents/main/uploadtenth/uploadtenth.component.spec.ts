import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadtenthComponent } from './uploadtenth.component';

describe('UploadtenthComponent', () => {
  let component: UploadtenthComponent;
  let fixture: ComponentFixture<UploadtenthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadtenthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadtenthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
