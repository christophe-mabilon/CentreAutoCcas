import { Component, OnInit } from '@angular/core';
import {AnnoncesService} from "../../shared/services/annonces.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-annonces-user',
  templateUrl: './annonces-user.component.html',
  styleUrls: ['./annonces-user.component.scss']
})
export class AnnoncesUserComponent implements OnInit {
  annonces!: any[];
  constructor(private annonceServ: AnnoncesService,private router:Router,private activateRoute:ActivatedRoute) { }




  editAnnonce(annonceId:number) {

  }

  ngOnInit(): void {
  this.annonceServ.findAll().subscribe(annonceServ =>{
    this.annonces = annonceServ;
  })
  }

  getAnnonce(id:number) {
  this.router.navigate(['/edit',id]);
  }
}
