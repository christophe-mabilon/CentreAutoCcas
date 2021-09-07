import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnnoncesService} from "../../shared/services/annonces.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MarqueService} from "../../shared/services/marque.service";
import {RegionService} from "../../shared/services/region.service";
import {ModelService} from "../../shared/services/model.service";
import {GarageService} from "../../shared/services/garage.service";
import {Marque} from "../../shared/interface/marque.interface";
import {Region} from "../../shared/interface/region.interface";
import {Subscription} from "rxjs";
import {UserService} from "../../shared/services/user.service";
import {first} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";
import {Annonce} from "../../shared/interface/annonce.inteface";

@Component({
  selector: 'app-edit-annonce-user',
  templateUrl: './edit-annonce-user.component.html',
  styleUrls: ['./edit-annonce-user.component.scss']
})
export class EditAnnonceUserComponent implements OnInit {
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


  }


  public subscriptions = new Subscription();



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

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.annonceService.findOne(id).subscribe( data => {
      this.annonce = data;
    } );
    this.marques = this.marqueServ.marques.value;
    this.types = this.modelServ.types.value;
    this.carburants = this.modelServ.carburants.value;
    this.regions = this.regionServ.regions.value;
    this.brandAndmodels = this.modelServ.brandAndModel.value;
    this.currentUser = this.userServ.getCurentUser();

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

  submit() {
console.log(this.editAnnonceForm)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

