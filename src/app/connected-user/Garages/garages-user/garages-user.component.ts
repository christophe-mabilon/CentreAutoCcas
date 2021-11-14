import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {GarageService} from "../../../shared/services/garage.service";
import normalize from 'normalize-json-api-response';
import {Router} from "@angular/router";
@Component({
  selector: 'app-garages-user',
  templateUrl: './garages-user.component.html',
  styleUrls: ['./garages-user.component.scss']
})
export class GaragesUserComponent implements OnInit {
  garages!: any[];

  constructor(private garageServ: GarageService,private router:Router) {
  }
  delete(id:number){
    this.garageServ.delete(id).subscribe(() =>{
      this.router.navigateByUrl("/garagesUser");
    })
  }
  ngOnInit(): void {
    this.garageServ.findAll().subscribe((data: any)=>{
      this.garages = data;
    })
  }



}
