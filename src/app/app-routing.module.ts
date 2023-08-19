import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { PipelineCarouselComponent } from './components/pipeline-carousel/pipeline-carousel.component';
import { ExampleComponent } from './components/example/example.component';

const routes: Routes = [
  { path: '', component: PipelineCarouselComponent},
  { path: 'example', component: ExampleComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
