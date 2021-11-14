import {Component, OnInit} from '@angular/core';
import {MarqueService} from "../../shared/services/marque.service";
import {RegionService} from "../../shared/services/region.service";
import {Marque} from "../../shared/interface/marque.interface";
import {Region} from "../../shared/interface/region.interface";
import {ModelService} from "../../shared/services/model.service";
import {GarageService} from "../../shared/services/garage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AnnoncesService} from "../../shared/services/annonces.service";
import {UserService} from "../../shared/services/user.service";
import {environment as env} from "../../../environments/environment";
import {FileService} from "../../shared/services/fileService";



@Component({
  selector: 'app-add-annonce-user',
  templateUrl: './add-annonce-user.component.html',
  styleUrls: ['./add-annonce-user.component.scss']
})
export class AddAnnonceUserComponent implements OnInit {
  private apiUrl = env.apiUrl;
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
  reference!:string;
  brand:number =0;
  model:number=0;
  loadingFinished!:Boolean;
  private selectedFile!: File;
  constructor(private userServ:UserService,private marqueServ: MarqueService, private regionServ: RegionService, private modelServ: ModelService
    , private garageServ: GarageService, private fb: FormBuilder, private router: Router, private annonceServ: AnnoncesService,private fileServ:FileService) {
  }

  //construction de la reference annonce unique
  makeRandomReference() {
    this.reference = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return this.reference;
  }


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
  addPhotos(photos:any) {
    this.addForm.controls['photos'].patchValue([photos]);

  }
  /**********************************************
      ENVOI DU FORMULAIRE D'AJOUT D'UNE ANNONCE
   *********************************************/
  addAnnonce(){
    this.formSubmitted = true;
    if (this.addForm.valid) {
      this.annonceServ.add(this.addForm.value).subscribe(v => this.router.navigate(['/annoncesUser']));
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
    photos : [""],
    user: localStorage.getItem('userId'),
    reference:[this.makeRandomReference()],
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

  });
}


