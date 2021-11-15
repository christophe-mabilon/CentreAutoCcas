import { Component, OnDestroy, OnInit } from '@angular/core';
import {GarageService} from "../../../shared/services/garage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Garage} from "../../../shared/interface/garage.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-garage-user',
  templateUrl: './edit-garage-user.component.html',
  styleUrls: ['./edit-garage-user.component.scss']
})
export class EditGarageUserComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
currentGarage!:Garage;
  private formSubmitted!: boolean;
  loadingFinished!:Boolean;
  constructor(private garageServ: GarageService, private fb: FormBuilder,private router:Router,private route:ActivatedRoute) { }
  public editGarageForm:FormGroup= this.fb.group({
    userId:['',Validators.required],
    imageGarage:[""],
    name: ["", Validators.required],
    streetNumber:["",Validators.required],
    streetName:["",Validators.required],
    address:["",Validators.required],
    postalCode:["",Validators.required],
    city:["",Validators.required],
    accept:["",Validators.required]
  });
  addPhotos(photos:any) {
    this.editGarageForm.controls['imageGarage'].patchValue( [photos] );
  }

  EditGarageSubmit(){
    this.formSubmitted = true;
    this.editGarageForm.patchValue({
      userId:localStorage.getItem('userId'),
    });
    if(this.loadingFinished && this.editGarageForm.valid){
      this.subs.add(
        this.garageServ.add(this.editGarageForm.value).subscribe(() => this.router.navigateByUrl('/garagesUser')));
      this.editGarageForm.reset();
      this.formSubmitted = false;
    }
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subs.add(
      this.garageServ.findOne(id).subscribe(garage=>{
      this.currentGarage = garage;
    }));
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

}
