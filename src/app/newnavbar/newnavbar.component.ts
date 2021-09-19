import {ChangeContext, LabelType, Options, PointerType} from '@angular-slider/ngx-slider'
import {Component, OnInit, ViewChild} from '@angular/core'
import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap'
import {Marque} from '../shared/interface/marque.interface'
import {MarqueService} from '../shared/services/marque.service'
import {ModelService} from "../shared/services/model.service";
import {BrandAndModel} from "../shared/interface/brand-and-model.interface";
import {RegionService} from "../shared/services/region.service";
import {convertUpdateArguments} from "@angular/compiler/src/compiler_util/expression_converter";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {AnnoncesService} from "../shared/services/annonces.service";
import {Router} from "@angular/router";
import {Annonce} from "../shared/interface/annonce.inteface";
import {BehaviorSubject} from "rxjs";
import {Region} from "../shared/interface/region.interface";

@Component({
  selector: 'app-newnavbar',
  templateUrl: './newnavbar.component.html',
  styleUrls: ['./newnavbar.component.scss']
})
export class NewnavbarComponent implements OnInit {
  @ViewChild('carousel', {static: true}) carousel!: NgbCarousel
  brandAndmodels!: BrandAndModel[];
  brands!: Marque[];
  brand!: any[];
  regions: any;
  selectedMarques: any[] = [];
  selectedModels: any[] = [];
  display = true;
  cellCount = 36;
  transform = '';
  selectedIndex = 0;
  angle!: number;
  number!: number;
  translate!: string;
  formSubmitted = false;
  searchForm!: FormGroup;

  constructor(private marqueServ: MarqueService, private modelServ: ModelService, private regionServ: RegionService,
              private config: NgbCarouselConfig, private fb: FormBuilder,private annonceServ:AnnoncesService,private router:Router) {
    // customize default values of carousels used by this component tree
    activeId: true
    config.interval = 0
    config.wrap = false
    config.keyboard = false
    config.pauseOnHover = false
    config.showNavigationArrows = false
    config.showNavigationIndicators;
    this.searchForm = this.fb.group({
      kilometrage: new FormControl([5000, 30000]),
      years: new FormControl([2005, 2017]),
      prices: new FormControl([500, 30000]),
      powers: new FormControl([7, 15]),
      minKilometre:new FormControl(""),
      maxKilometre:new FormControl(""),
      minYear:new FormControl(""),
      maxYear:new FormControl(""),
      minPrice:new FormControl(""),
      maxPrice:new FormControl(""),
      minPower:new FormControl(""),
      maxPower:new FormControl(""),
      regions: [""],
      brands:new FormControl(""),
      models: [""],
      fuel: [""],
      typeOfVehicle: [""],
      gearbox: [""],
      carDoors: [""],
      places: [""],
      })
  }


  prev() {
    this.carousel.prev()
  }

  next() {
    this.carousel.next()
  }

  //slider année
  optionsYear: Options = {
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
  optionsPrice: Options = {
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
  optionsPower:
    Options = {
    floor: 4,
    ceil: 20,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + 'chx'
        case LabelType.High:
          return value + 'chx'
        default:
          return value + 'chx'
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
          this.selectedModels.push({'brandId':item.brandId,'brand': item.brand,'modelId':item.modelId, 'model': item.model});
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
    this.regions = this.regionServ.regions.value;
    this.brand = this.marqueServ.marque;
    this.brandAndmodels = this.modelServ.brandAndModel.value;
    this.brands = this.marqueServ.marques.value;
    this.marqueServ.emitterr.subscribe(() => (this.display = !this.display));
  }

  envoi() {
    this.searchForm.patchValue({
      regions:this.searchForm.value.regions,
      models:this.searchForm.value.models.model,
      brands:this.searchForm.value.models.brand,
      fuel:this.searchForm.value.fuel,
      typeOfVehicle:this.searchForm.value.typeOfVehicle,
      gearbox: this.searchForm.value.gearbox,
      carDoors: this.searchForm.value.carDoors,
      places:this.searchForm.value.places,
      minKilometre:this.searchForm.value.kilometrage[0],
      maxKilometre:this.searchForm.value.kilometrage[1],
      minYear:this.searchForm.value.years[0],
      maxYear:this.searchForm.value.years[1],
      minPrice:this.searchForm.value.prices[0],
      maxPrice:this.searchForm.value.prices[1],
      minPower:this.searchForm.value.powers[0],
      maxPower:this.searchForm.value.powers[1]
  });
console.log((this.searchForm.value))
  }
}
