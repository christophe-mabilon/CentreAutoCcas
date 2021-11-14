import { MdpOublieComponent } from '../mdp-oublie/mdp-oublie.component';
import { Component, OnInit } from '@angular/core';
import { ModalProComponent } from '../modal-pro/modal-pro.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarqueService } from '../shared/services/marque.service';
import {UserService} from "../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component implements OnInit {

  searchButton = true;
  navbarOpen = false;
  expression = false;
  showPassword:boolean = false;
  username: string= this.userServ.getUsername()
  isLogged:boolean = this.userServ.getIsLogged();
  isAdmin:boolean = this.userServ.getIsAdmin();

  constructor(private marqueService: MarqueService,private userServ:UserService, private modalService: NgbModal,
              private router:Router,private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
    });
    this.isLogged = this.userServ.getIsLogged();
    this.isAdmin = this.userServ.getIsAdmin();
    this.username = this.userServ.getUsername();
  }

  /************************************
   OUVRE OU FERME LA BARRE DE RECHERCHE
   ***********************************/
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    this.expression = !this.expression;
  }
  /************************************
   AFFICHE OU MASQUE LE MOT DE PASSE
   ***********************************/
  changeTypePassword() {
    this.showPassword = !this.showPassword;
  }

  /****************************
   LOGOUT
   ***************************/
  logout() {
    this.isAdmin =false;
    this.isLogged = false;
    sessionStorage.clear();
    this.userServ.loggedout();
    this.router.navigate(['/home']);
  }

  /***************************
   REDIRECTION USER / ADMIN
   ***************************/
  pageUser(){
    this.router.navigate(['/connectedUser']);
  }
  pageAdmin(){
    this.router.navigate(['/connectedAdmin']);
  }

  /********************************
   OUVRE/FERME LE MENU DE RECHERCHE
   ********************************/
  clickEvent(): void {
    this.marqueService.clickEvent();
    this.searchButton = !this.searchButton;
  }
  /****************************************
   OUVRE LE MENU DE CONNECTION UTILISATEUR
   ***************************************/
  open() {
    this.modalService.open(ModalProComponent, {
      size: 'sm'
    });
  }
  /****************************************
   CACHE/AFFICHE LE MOT DE PASSE UTILISATEUR
   ***************************************/
  mdp() {
    this.modalService.open(MdpOublieComponent, {
      size: 'sm'
    });
  }

  getData() {
    this.isLogged = this.userServ.getIsLogged();
    this.isAdmin = this.userServ.getIsAdmin();
    this.username = this.userServ.getUsername();
  }
  ngOnInit(): void {
    this.getData();
  }


}
