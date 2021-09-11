import {Component, OnInit} from '@angular/core';
import {MarqueService} from "../../shared/services/marque.service";
import {RegionService} from "../../shared/services/region.service";
import {Marque} from "../../shared/interface/marque.interface";
import {Region} from "../../shared/interface/region.interface";
import {ModelService} from "../../shared/services/model.service";
import {GarageService} from "../../shared/services/garage.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AnnoncesService} from "../../shared/services/annonces.service";
import {reference} from "@popperjs/core";
import {BehaviorSubject, observable} from "rxjs";
import {UserService} from "../../shared/services/user.service";



@Component({
  selector: 'app-add-annonce-user',
  templateUrl: './add-annonce-user.component.html',
  styleUrls: ['./add-annonce-user.component.scss']
})
export class AddAnnonceUserComponent implements OnInit {
  marques!: Marque[];
  regions!: Region[];
  selectedModels!: any[];
  brandAndmodels: any;
  selectedMarque!: string;
  garages!: any[];
  carburants!: any[];
  types!: any[];
  private formSubmitted!: boolean;
  valueToOccas!: 0;
  currentUser:any;
  reference:string | null = sessionStorage.getItem('userId');
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  lengthOfCode = 10;
  private selectedFile!: File;
  constructor(private userServ:UserService,private marqueServ: MarqueService, private regionServ: RegionService, private modelServ: ModelService
    , private garageServ: GarageService, private fb: FormBuilder, private router: Router, private annonceServ: AnnoncesService) {
  }

  //construction de la reference annonce unique
  makeRandomReference(lengthOfCode:number,possible:string) {
    for (let i = 0; i < lengthOfCode; i++) {
      this.reference += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return this.reference;
  }



  /*********************
   *  photos
   ************************/


//for of pour l'année
  annee(i: number) {
    return new Array(i);
  };

  //for of pour la puissance du véhicule
  puissance(i: number) {
    return new Array(i);
  };

//for of pour les places du vehicule
  nbPlaces(i: number) {
    return new Array(i);
  };



  //Séléction de models en fonction de marques selectionées
  selectMarques(event: any) {
    this.selectedMarque = event.target.value;
    this.selectedModels = [];
    for (let item of this.brandAndmodels) {
      console.log(this.selectedMarque)
      if (this.selectedMarque == item.brandId) {
        this.selectedModels.push({
          "brandId": item.brandId,
          'brand': item.brand,
          'modelId': item.modelId,
          'model': item.model
        });
      }
    }
    return this.selectedModels;
  }

  /**********************************************
      ENVOI DU FORMULAIRE D'AJOUT D'UNE ANNONCE
   *********************************************/
  addAnnonce(){
console.log(this.addForm.value)
    this.formSubmitted = true;
    if (this.addForm.valid) {
      this.annonceServ.add(this.addForm.value).subscribe(v => this.router.navigate(['/annoncesUser']));console.log(this.addForm.value)
      this.addForm.reset();
      this.formSubmitted = false;
    }
  }
  ngOnInit(): void {
    this.marques = this.marqueServ.marques.value;
    this.types = this.modelServ.types.value;
    this.carburants = this.modelServ.carburants.value;
    this.regions = this.regionServ.regions.value;
    this.brandAndmodels = this.modelServ.brandAndModel.value;
    this.garageServ.findAllByUser().subscribe((data: any) => {
      this.garages = data;
    });


  }
  public addForm: FormGroup = this.fb.group({
    user: [sessionStorage.getItem('userId')],
    reference:[this.makeRandomReference(this.lengthOfCode,this.possible)],
    region: ["", Validators.required],
    brand: ["", Validators.required],
    model: ["", Validators.required],
    typeOfVehicle: ["", Validators.required],
    fuel: ["", Validators.required],
    kilometre: ["", Validators.required],
    year: ["", Validators.required],
    power: ["", Validators.required],
    gearbox: ["", Validators.required],
    carDoors: ["", Validators.required],
    places: ["", Validators.required],
    garage: ["", Validators.required],
    title: ["", Validators.required],
    price: ["", Validators.required],
    modelComplement: ["", Validators.required],
    modelComplement2: ["", Validators.required],
    description: ["", Validators.required],
    primeEco: [false],
    topOcass: [false],
    accept: [""],
    photos:this.fb.array(["../../assets/audi-a4.png"])

  });
}


