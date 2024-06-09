import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversePageComponent } from './converse-page.component';

describe('ConversePageComponent', () => {
  let component: ConversePageComponent;
  let fixture: ComponentFixture<ConversePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
