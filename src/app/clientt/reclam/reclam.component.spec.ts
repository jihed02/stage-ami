import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamComponent } from './reclam.component';

describe('ReclamComponent', () => {
  let component: ReclamComponent;
  let fixture: ComponentFixture<ReclamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamComponent]
    });
    fixture = TestBed.createComponent(ReclamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
