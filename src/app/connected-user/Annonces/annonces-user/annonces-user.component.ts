import { Component, OnDestroy, OnInit } from '@angular/core';
import {AnnoncesService} from "../../../shared/services/annonces.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-annonces-user',
  templateUrl: './annonces-user.component.html',
  styleUrls: ['./annonces-user.component.scss']
})
export class AnnoncesUserComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  annonces!: any[];
  constructor(private annonceServ: AnnoncesService,private router:Router,private activateRoute:ActivatedRoute) { }

  delete(id:number){
    this.subs.add(this.annonceServ.delete(id).subscribe(() =>{
      this.router.navigateByUrl("/annoncesUser");
    }));
  }

  getAnnonce(id:number) {
    this.router.navigate(['/edit',id]);
  }

  ngOnInit(): void {
  this.subs.add(this.annonceServ.findAll().subscribe(annonceServ =>{
    this.annonces = annonceServ;
  }));
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

}
