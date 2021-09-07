import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiqueDeConfComponent } from './politique-de-conf.component';

describe('PolitiqueDeConfComponent', () => {
  let component: PolitiqueDeConfComponent;
  let fixture: ComponentFixture<PolitiqueDeConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolitiqueDeConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitiqueDeConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
