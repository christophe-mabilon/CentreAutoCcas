import {Component, OnInit} from '@angular/core';
import {AnnoncesService} from "../shared/services/annonces.service";
import {Annonce} from "../shared/interface/annonce.inteface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {
  annonces!: Annonce[] ;

  constructor(private service:AnnoncesService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(r => this.annonces = r);

  }


}


