import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddARoomComponent } from './add-a-room.component';

describe('AddARoomComponent', () => {
  let component: AddARoomComponent;
  let fixture: ComponentFixture<AddARoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddARoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddARoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
