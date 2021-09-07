import { Component, OnInit } from "@angular/core";
import {MarqueService} from "../shared/services/marque.service";
import {RegionService} from "../shared/services/region.service";
import {Region} from "../shared/interface/region.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {Marque} from "../shared/interface/marque.interface";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/interface/user.interface";
import {AnnoncesService} from "../shared/services/annonces.service";
import {GarageService} from "../shared/services/garage.service";

@Component({
  selector: "app-connected-user",
  templateUrl: "./connected-user.component.html",
  styleUrls: ["./connected-user.component.scss"],
})
export class ConnectedUserComponent implements OnInit {
  userDetails!:any[];
  regions!:BehaviorSubject<Region[]>;

  marques!: BehaviorSubject<Marque[]>;
  constructor(private annoncesServ:AnnoncesService,private garageServ:GarageService,private marqueServ:MarqueService,private regionserv:RegionService,private userServ:UserService) {}



  ngOnInit(): void {
    this.regions = this.regionserv.regions;
    this.marques = this.marqueServ.marques;
    //this.userServ.getCurentUser().subscribe( data => {
      //this.userDetails = Array.of(data);
    //});

  }
}
