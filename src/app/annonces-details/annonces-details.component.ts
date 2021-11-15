// noinspection ES6UnusedImports

import { Component, OnDestroy, OnInit } from '@angular/core';
import {Annonce} from "../shared/interface/annonce.inteface";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AnnoncesService} from "../shared/services/annonces.service";
import {HttpClient} from "@angular/common/http";
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.scss']
})
export class AnnoncesDetailsComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  annonce!: any;
  userId: any;
  isAdmin=false;

  constructor(private route: ActivatedRoute,
              private annonceService: AnnoncesService) { }

getUserId(annonce:Annonce){
    this.userId = parseInt(<string>localStorage.getItem('userId'));
    if(localStorage.getItem('isAdmin') === 'true')
    this.isAdmin  = true;
}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subs.add((this.annonceService.findOne(id).subscribe( data => {
      this.annonce = data;this.getUserId(data);
    } )));
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }


}
