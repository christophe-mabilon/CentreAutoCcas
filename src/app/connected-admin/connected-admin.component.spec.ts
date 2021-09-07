import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedAdminComponent } from './connected-admin.component';

describe('ConnectedAdminComponent', () => {
  let component: ConnectedAdminComponent;
  let fixture: ComponentFixture<ConnectedAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
