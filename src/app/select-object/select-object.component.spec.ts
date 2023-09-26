import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectObjectComponent } from './select-object.component';

describe('SelectObjectComponent', () => {
  let component: SelectObjectComponent;
  let fixture: ComponentFixture<SelectObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectObjectComponent]
    });
    fixture = TestBed.createComponent(SelectObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
