import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskWrapperComponent } from './mask-wrapper.component';

describe('MaskWrapperComponent', () => {
  let component: MaskWrapperComponent;
  let fixture: ComponentFixture<MaskWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaskWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaskWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
