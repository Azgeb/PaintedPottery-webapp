import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { PipelineCarouselComponent } from './components/pipeline-carousel/pipeline-carousel.component';

const routes: Routes = [
  { path: '', component: PipelineCarouselComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
