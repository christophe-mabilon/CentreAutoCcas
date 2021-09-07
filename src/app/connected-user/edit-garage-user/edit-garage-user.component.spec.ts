import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGarageUserComponent } from './edit-garage-user.component';

describe('EditGarageUserComponent', () => {
  let component: EditGarageUserComponent;
  let fixture: ComponentFixture<EditGarageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGarageUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGarageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
