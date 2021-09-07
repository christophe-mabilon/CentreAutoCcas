import {Component, OnInit} from '@angular/core';
import {MarqueService} from "../../shared/services/marque.service";
import {RegionService} from "../../shared/services/region.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Marque} from "../../shared/interface/marque.interface";
import {Region} from "../../shared/interface/region.interface";
import {ModelService} from "../../shared/services/model.service";
import {GarageService} from "../../shared/services/garage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  addForm!: FormGroup;
  carburants!:any[];
  types!:any[];



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

  constructor(private marqueServ: MarqueService, private regionServ: RegionService, private modelServ: ModelService
    , private garageServ: GarageService, private fb: FormBuilder) {
  }

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
    this.addForm = this.fb.group({
      userid:["",Validators.required],
      region: ["", Validators.required],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      typeOfVehicule: ["", Validators.required],
      fuel: ["", Validators.required],
      kilometre: ["", Validators.required],
      year: ["", Validators.required],
      power: ["", Validators.required],
      gearbox: ["", Validators.required],
      doors: ["", Validators.required],
      places: ["", Validators.required],
      garageId: ["", Validators.required],
      description: ["", Validators.required],
      photo1: ["", Validators.required],
      photo2: ["", Validators.required],
      photo3: ["", Validators.required],
      photo4: ["", Validators.required],
      photo5: ["", Validators.required],
      accept:["",Validators.required]
    });
    console.log(this.addForm.value)
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
    this.addForm = this.fb.group({
      userid:["",Validators.required],
      region: ["", Validators.required],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      typeOfVehicule: ["", Validators.required],
      fuel: ["", Validators.required],
      kilometre: ["", Validators.required],
      year: ["", Validators.required],
      power: ["", Validators.required],
      gearbox: ["", Validators.required],
      doors: ["", Validators.required],
      places: ["", Validators.required],
      garageId: ["", Validators.required],
      description: ["", Validators.required],
      photo1: ["", Validators.required],
      photo2: ["", Validators.required],
      photo3: ["", Validators.required],
      photo4: ["", Validators.required],
      photo5: ["", Validators.required],
      accept:["",Validators.required]
    });

  }

}


