import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdCarouselConfig } from './caroussel-config.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdCarouselConfig],
  exports: [NgbdCarouselConfig],
  bootstrap: [NgbdCarouselConfig]
})

