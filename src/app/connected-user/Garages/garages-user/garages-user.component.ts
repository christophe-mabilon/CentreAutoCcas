import {Component, OnDestroy, OnInit} from '@angular/core';
import {GarageService} from "../../../shared/services/garage.service";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-garages-user',
  templateUrl: './garages-user.component.html',
  styleUrls: ['./garages-user.component.scss']
})
export class GaragesUserComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  garages!: any[];

  constructor(private garageServ: GarageService,private router:Router) {
  }
  delete(id:number){
    this.subs.add(
this.garageServ.delete(id).subscribe(() =>{
      this.router.navigateByUrl("/garagesUser");
    }));
  }
  ngOnInit(): void {
    this.subs.add(
this.garageServ.findAll().subscribe((data: any)=>{
      this.garages = data;
    }));
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }


}
