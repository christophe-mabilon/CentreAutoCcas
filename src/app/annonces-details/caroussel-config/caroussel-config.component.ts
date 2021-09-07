import {Component, Input, OnInit} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Annonce} from "../../shared/interface/annonce.inteface";

@Component({
  selector: 'app-carrousel',
  templateUrl: './caroussel-config.component.html',
  styleUrls: ['./caroussel-config.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class CarousselConfigComponent implements OnInit{
  @Input() annonce!: Annonce[];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {

  }
}

