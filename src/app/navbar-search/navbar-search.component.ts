import {LabelType, Options} from '@angular-slider/ngx-slider'
import {Component, OnInit, ViewChild} from '@angular/core'
import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap'
import {Marque} from '../shared/interface/marque.interface'
import {MarqueService} from '../shared/services/marque.service'
import {ModelService} from "../shared/services/model.service";
import {BrandAndModel} from "../shared/interface/brand-and-model.interface";
import {RegionService} from "../shared/services/region.service";
import {convertUpdateArguments} from "@angular/compiler/src/compiler_util/expression_converter";

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
})
export class NavbarSearchComponent implements OnInit {
  @ViewChild('carousel', {static: true}) carousel!: NgbCarousel
  brandAndmodels!: BrandAndModel[];
  brands!: Marque[];
  brand!: any[];
  regions!: any[];
  selectedMarques: any[] = [];
  selectedModels: any[] = [];
  display = true;
  cellCount = 36;
  transform = '';
  selectedIndex = 0;
  angle!: number;
  number!: number;
  translate!: string;

  constructor(private marqueServ: MarqueService, private modelServ: ModelService, private regionServ: RegionService, private config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    activeId: true
    config.interval = 0
    config.wrap = false
    config.keyboard = false
    config.pauseOnHover = false
    config.showNavigationArrows = false
    config.showNavigationIndicators
  }


  prev() {
    this.carousel.prev()
  }

  next() {
    this.carousel.next()
  }

  //slider année
  minAnnee: number = 2003
  maxAnnee: number = 2018
  optionsAnnee: Options = {
    floor: 2000,
    ceil: 2021,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '' + value
        case LabelType.High:
          return '' + value
        default:
          return '' + value
      }
    },
  }
  //kilometrage
  minKilo: number = 9000
  maxKilo: number = 40000
  optionsKilo: Options = {
    floor: 3000,
    ceil: 50000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + 'Km'
        case LabelType.High:
          return value + 'Km'
        default:
          return value + 'Km'
      }
    },
  }
  //slider Prix
  minPrix: number = 9000
  maxPrix: number = 35000
  optionsPrix: Options = {
    floor: 3000,
    ceil: 45000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '€'
        case LabelType.High:
          return value + '€'
        default:
          return value + '€'
      }
    },
  }

  //slider Puissance
  minPuissance: number = 9000
  maxPuissance: number = 35000
  optionsPuissance: Options = {
    floor: 3000,
    ceil: 45000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '€'
        case LabelType.High:
          return value + '€'
        default:
          return value + '€'
      }
    },
  }

  /****************************************
   CARROUSEL MARQUES VOITURES
   ****************************************/
  //selection des marques dans le carousel
  selectionMarques(number: number) {
    var index = this.selectedMarques.indexOf(this.brand[number])
    if (index > -1) {
      this.selectedMarques.splice(index, 1)
    } else {
      this.selectedMarques.push(this.brand[number]);
      //console.log(`marque séléctionée : ${this.selectedMarques}`)

    }
    this.selectionModel();
  }

  //Séléction de models en fonction de marques selectionées
  selectionModel() {
    this.selectedModels = [];
    for (let item of this.brandAndmodels) {
      for (let selectedMarque of this.selectedMarques) {
        if (selectedMarque == item.brand) {
          this.selectedModels.push({'brand': selectedMarque, 'model': item.model});
        }
      }
    }
    return this.selectedModels;
  }


  //Rotation du carousel
  clickMoreLess(number: number) {
    if (number === 1) {
      this.selectedIndex--
      this.angle = (this.selectedIndex / this.cellCount) * -360
      this.translate = 'translateZ(-600px) rotateY(' + this.angle + 'deg)'
    } else if (number === -1) {
      this.selectedIndex++
      this.angle = (this.selectedIndex / this.cellCount) * -360
      this.translate = 'translateZ(-600px) rotateY(' + this.angle + 'deg)'
    }
  }

  ngOnInit(): void {
    this.regions = this.regionServ.regionsName;
    this.brand = this.marqueServ.marque;
    this.brandAndmodels = this.modelServ.brandAndModel.value;
    this.brands = this.marqueServ.marques.value;
    this.marqueServ.emitterr.subscribe(() => (this.display = !this.display))
  }
}
