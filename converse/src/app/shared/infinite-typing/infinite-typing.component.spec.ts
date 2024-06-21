import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteTypingComponent } from './infinite-typing.component';

describe('InfiniteTypingComponent', () => {
  let component: InfiniteTypingComponent;
  let fixture: ComponentFixture<InfiniteTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfiniteTypingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
