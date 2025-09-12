import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listComponent } from './list.component';

describe('Home', () => {
  let component: listComponent;
  let fixture: ComponentFixture<listComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [listComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
