import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAdharComponent } from './upload-adhar.component';

describe('UploadAdharComponent', () => {
  let component: UploadAdharComponent;
  let fixture: ComponentFixture<UploadAdharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAdharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAdharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
