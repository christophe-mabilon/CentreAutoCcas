import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesUserComponent } from './vehicules-user.component';

describe('VehiculesUserComponent', () => {
  let component: VehiculesUserComponent;
  let fixture: ComponentFixture<VehiculesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
