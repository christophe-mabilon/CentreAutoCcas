import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Marque} from "../../shared/interface/marque.interface";
import {Region} from "../../shared/interface/region.interface";
import {MarqueService} from "../../shared/services/marque.service";
import {RegionService} from "../../shared/services/region.service";
import {ModelService} from "../../shared/services/model.service";
import {GarageService} from "../../shared/services/garage.service";

@Component({
  selector: 'app-add-garage-user',
  templateUrl: './add-garage-user.component.html',
  styleUrls: ['./add-garage-user.component.scss']
})
export class AddGarageUserComponent implements OnInit {
  marques!: Marque[];
  regions!: Region[];
  selectedModels!: any[];
  brandAndmodels: any;
  selectedMarque!: string;
  garages!: any[];
  addForm!: FormGroup;
  carburants!:any[];
  types!:any[];

  public addGarageForm:FormGroup= this.fb.group({
    image:[""],
    name: ['', Validators.required],
    streetNumber:["",Validators.required],
    streetName:["",Validators.required],
    adress:["",Validators.required],
    postalCode:["",Validators.required],
    city:["",Validators.required],
    accept:["",Validators.required]

  });
  constructor(private marqueServ: MarqueService, private regionServ: RegionService, private modelServ: ModelService
    , private garageServ: GarageService, private fb: FormBuilder) { }
  addGarageSubmit(){
    console.log(this.addGarageForm.value)
    //this.formSubmitted = true;
    /*if (this.form.valid) {
      this.garageServ.add(this.form.value).subscribe(v => this.router.navigate(['/products']));
      this.form.reset();
      this.formSubmitted = false;
    }*/
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
  }

