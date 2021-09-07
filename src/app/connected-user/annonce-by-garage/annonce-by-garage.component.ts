import {Component, OnInit} from '@angular/core';
import {AnnoncesService} from "../../shared/services/annonces.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Annonce} from "../../shared/interface/annonce.inteface";

@Component({
  selector: 'app-annonce-by-garage',
  templateUrl: './annonce-by-garage.component.html',
  styleUrls: ['./annonce-by-garage.component.scss']
})
export class AnnonceByGarageComponent implements OnInit {
  annonces!: any;
  constructor(private annonceServ: AnnoncesService) {
  }

  ngOnInit(): void {
this.annonces = this.annonceServ.findAllByUser().subscribe(data =>{
  this.annonces = data
});


  }

}
