import { FormGroup, FormBuilder } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AnnoncesService} from "../shared/services/annonces.service";
import {Annonce} from "../shared/interface/annonce.inteface";
import {BehaviorSubject, Observer} from "rxjs";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {
  adReceived:any;
  searchAnnonce: any;
  annonces!: Annonce[] ;
  constructor(private annoncesService:AnnoncesService,private fb:FormBuilder) {

  }



  ngOnInit(): void {
    this.annoncesService.getsearchForm().subscribe(adReceived=>{
      this.adReceived = adReceived;
      if(this.adReceived.valid)this.annoncesService.searchAnnonces(this.adReceived.value).subscribe(
      data=>{this.searchAnnonce = data;
    })
    })



    this.annoncesService.findAll().subscribe(r => this.annonces = r);
  }
}


