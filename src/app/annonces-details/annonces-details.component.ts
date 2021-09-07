import { Component, Input, OnInit } from '@angular/core';
import {Annonce} from "../shared/interface/annonce.inteface";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AnnoncesService} from "../shared/services/annonces.service";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.scss']
})
export class AnnoncesDetailsComponent implements OnInit {
  annonce!: any;
  constructor(private route: ActivatedRoute,
              private annonceService: AnnoncesService) { }



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.annonceService.findOne(id).subscribe( data => {
      this.annonce = data;
    } );
  }
}
