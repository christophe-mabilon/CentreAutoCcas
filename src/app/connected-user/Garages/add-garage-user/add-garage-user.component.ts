import { Garage } from './../../../shared/interface/garage.interface';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GarageService} from "../../../shared/services/garage.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-add-garage-user',
  templateUrl: './add-garage-user.component.html',
  styleUrls: ['./add-garage-user.component.scss']
})
export class AddGarageUserComponent implements OnInit {
  currentGarage!:Garage;
  private formSubmitted!: boolean;
  loadingFinished:Boolean=false;
  addGarage = false;
  editGarage= false;
  GarageForm!: FormGroup;
  photosReceived:any;
  constructor(private garageServ: GarageService, private fb: FormBuilder,private router:Router,private route:ActivatedRoute) {

  }

  patchValues(currentGarage:Garage){
    if(this.editGarage){
    this.GarageForm.patchValue({
    userId:localStorage.getItem('userId'),
    imageGarage:"",
    name: currentGarage.name,
    streetNumber:currentGarage.streetNumber,
    streetName:currentGarage.streetName,
    address:currentGarage.address,
    postalCode:currentGarage.postalCode,
    city:currentGarage.city,
    accept:""
  });
    }
  }


  addPhotos(photos:any) {
    this.photosReceived = photos

  }

  GarageSubmit(){
    this.GarageForm.controls['imageGarage'].patchValue( [this.photosReceived] );

    if(this.editGarage){
      this.formSubmitted = true;
    if(this.loadingFinished && this.GarageForm.valid){
      this.garageServ.update(this.GarageForm.value,this.currentGarage.id).subscribe(() => this.router.navigateByUrl('/garagesUser'));
      this.GarageForm.reset();
      this.formSubmitted = false;
    }
    }else if(this.addGarage){
      this.formSubmitted = true;
      if(this.loadingFinished && this.GarageForm.valid){
        this.garageServ.add(this.GarageForm.value).subscribe(() => this.router.navigateByUrl('/garagesUser'));
        this.GarageForm.reset();
        this.formSubmitted = false;
    }
    else{
      const erreurs = "une erreur est survenue";
    }

  }
}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(id > 0) {
      this.garageServ.findOne(id).subscribe(garage => {
        this.currentGarage = garage
        this.addGarage = false;
      this.editGarage = true;
    this.patchValues(this.currentGarage);
      });

    }else{
      this.editGarage = false
      this.addGarage = true;
    }
    this.GarageForm= this.fb.group({
      userId:[ localStorage.getItem('userId')],
      imageGarage:[""],
      name: ["", Validators.required],
      streetNumber:["",Validators.required],
      streetName:["",Validators.required],
      address:["",Validators.required],
      postalCode:["",Validators.required],
      city:["",Validators.required],
      accept:["",Validators.required]
    });

  }

}
