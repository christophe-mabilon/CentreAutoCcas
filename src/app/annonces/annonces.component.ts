import { Annonce } from './../shared/interface/annonce.inteface';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AnnoncesService} from "../shared/services/annonces.service";
import {BehaviorSubject, Observer} from "rxjs";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {
  adReceived:any;
  searchAnnonces!:Annonce[];
  annonces!:Annonce[] ;
  currentPageAnnonces = 1;
  pageSizeAnnonces!: number ;
  currentPageSearch = 1;
  pageSizeSearch!: number ;
  itemsPerPage = 12;
  collectionSize = 12;
  constructor(private annoncesService:AnnoncesService,private fb:FormBuilder) {


  }
  /** pagination annonces */
  public onPageChangeAnnonces(pageNum: number): void {
    this.pageSizeAnnonces = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesizeAnnonces(num: number): void {
  this.itemsPerPage = this.pageSizeAnnonces + num;
}
/** pagination Search */
public onPageChangeSearch(pageNum: number): void {
  this.pageSizeSearch = this.itemsPerPage*(pageNum - 1);
}

public changePagesizeSearch(num: number): void {
this.itemsPerPage = this.pageSizeAnnonces + num;
}
countLenghtAnnonces():number{
  this.collectionSize = Object.keys(this.annonces).length ;
  return this.collectionSize;
}
  ngOnInit(): void {
    this.annoncesService.getsearchForm().subscribe(adReceived=>{
      this.adReceived = adReceived;
  });
    if(this.adReceived.valid){
      this.annoncesService.searchAnnonces(this.adReceived.value).subscribe(
      (data:any)=>{ this.searchAnnonces = data;
    })
  }
  this.annoncesService.findAll().subscribe((r:any) =>
    this.annonces = r
    )}

}


