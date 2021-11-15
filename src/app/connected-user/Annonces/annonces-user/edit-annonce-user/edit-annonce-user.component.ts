import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnnoncesService} from "../../../../shared/services/annonces.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarqueService} from "../../../../shared/services/marque.service";
import {RegionService} from "../../../../shared/services/region.service";
import {ModelService} from "../../../../shared/services/model.service";
import {GarageService} from "../../../../shared/services/garage.service";
import {Marque} from "../../../../shared/interface/marque.interface";
import {Region} from "../../../../shared/interface/region.interface";
import {UserService} from "../../../../shared/services/user.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-annonce-user',
  templateUrl: './edit-annonce-user.component.html',
  styleUrls: ['./edit-annonce-user.component.scss']
})
export class EditAnnonceUserComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  importPhotos:any;
  annonce!: any;
  marques!: Marque[];
  regions!: Region[];
  selectedModels!: any[];
  brandAndmodels: any;
  selectedMarque!: string;
  garages!: any[];
  carburants!: any[];
  types!: any[];
  submitted = false;
  currentUser:any;
  editAnnonceForm!: FormGroup;
  constructor(private route: ActivatedRoute, private annonceService: AnnoncesService, private fb: FormBuilder,
              private router: Router, private marqueServ: MarqueService, private regionServ: RegionService,
              private modelServ: ModelService, private garageServ: GarageService,private userServ:UserService) {
              this.editAnnonceForm = this.fb.group({
                region: ["", Validators.required],
                brand: ["", Validators.required],
                model: ["", Validators.required],
                typeOfVehicule: ["", Validators.required],
                fuel: ["", Validators.required],
                kilometre: ["", Validators.required],
                year: ["", Validators.required],
                power: ["", Validators.required],
                gearbox: ["", Validators.required],
                carDoors: ["", Validators.required],
                places: ["", Validators.required],
                garage: ["", Validators.required],
                description: ["", Validators.required],
                photos: ["", Validators.required],
                accept:["",Validators.required]
              });
}
  //Séléction de models en fonction de marques selectionées
  selectMarques(event: any) {
    this.selectedMarque = event.target.value;
    this.selectedModels = [];
    for (let item of this.brandAndmodels) {
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
    this.editAnnonceForm.patchValue({
      photos:[photos]
    })
  }
patchValue(value:any){
  this.importPhotos=value[0].photos[0];
this.editAnnonceForm.patchValue({
  id:value[0].id,
  region: [value[0].region.name],
  brand: [value[0].brand.name],
  model: [value[0].model.name],
  typeOfVehicule: [value[0].typeOfVehicle],
  fuel: [value[0].fuel],
  kilometre: [value[0].kilometre],
  year: [value[0].year],
  power: [value[0].power],
  gearbox: [value[0].gearbox],
  carDoors: [value[0].carDoors],
  places: [value[0].places],
  garage: [value[0].garage.name],
  description: [value[0].description],
              });
}

submit() {
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.subs.add(this.annonceService.findOne(id).subscribe((data:any) => {
        this.patchValue(data);
        this.annonce = data;
        }));
      }
    }

    ngOnDestroy(): void {
      if (this.subs) this.subs.unsubscribe();
    }





}

