import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {GarageService} from "../../shared/services/garage.service";
import normalize from 'normalize-json-api-response';
@Component({
  selector: 'app-garages-user',
  templateUrl: './garages-user.component.html',
  styleUrls: ['./garages-user.component.scss']
})
export class GaragesUserComponent implements OnInit {
  garages!: any[];

  constructor(private garageServ: GarageService) {
  }

  ngOnInit(): void {
    this.garageServ.findAll().subscribe((data: any)=>{
      this.garages = data;
    })
  }



}
