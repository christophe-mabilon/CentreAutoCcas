import { MdpOublieComponent } from '../mdp-oublie/mdp-oublie.component';
import { Component, OnInit } from '@angular/core';
import { ModalProComponent } from '../modal-pro/modal-pro.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarqueService } from '../shared/services/marque.service';
import {UserService} from "../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { User } from '../shared/interface/user.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  currentUser!:any;
  searchButton = true;
  navbarOpen = false;
  expression = false;
  showPassword:boolean = false;
  username = "";
  isLogged = false
  isAdmin=false;

  constructor(private marqueService: MarqueService,private userServ:UserService, private modalService: NgbModal,private router:Router,) {
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
    localStorage.clear();
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

  ngOnInit(): void {
    this.userServ.getCurentUser().subscribe(currentUser=>{{
if(currentUser){
      this.isLogged = true;
         if(currentUser.roles[0] ==="ROLE_ADMIN"){this.isAdmin = true };
        this.username = currentUser.username;
        this.ngOnInit();
    }
    }});

  }
}
