import { Component, OnInit } from '@angular/core';
import {AnnoncesService} from "../../shared/services/annonces.service";

@Component({
  selector: 'app-vehicules-user',
  templateUrl: './vehicules-user.component.html',
  styleUrls: ['./vehicules-user.component.scss']
})
export class VehiculesUserComponent implements OnInit {
  annonces!: any;
  constructor(private annonceServ: AnnoncesService) { }

  ngOnInit(): void {
    this.annonces = this.annonceServ.findAllByBrand().subscribe(data =>{
      this.annonces = data
    });
  }

}
