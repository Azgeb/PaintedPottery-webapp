import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaskComponent } from './components/mask/mask.component';
import { CropComponent } from './components/crop/crop/crop.component';
import { PipelineCarouselComponent } from './components/pipeline-carousel/pipeline-carousel.component';
import { UploadComponent } from './components/upload/upload.component';
import { MaskWrapperComponent } from './components/mask-wrapper/mask-wrapper.component';
import { ExampleComponent } from './components/example/example.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainFrameComponent,
    MaskComponent,
    CropComponent,
    PipelineCarouselComponent,
    UploadComponent,
    MaskWrapperComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
