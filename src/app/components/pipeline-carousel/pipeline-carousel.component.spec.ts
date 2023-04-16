import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineCarouselComponent } from './pipeline-carousel.component';

describe('PipelineCarouselComponent', () => {
  let component: PipelineCarouselComponent;
  let fixture: ComponentFixture<PipelineCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
