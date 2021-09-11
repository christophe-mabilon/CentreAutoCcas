import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MdpOublieComponent} from '../mdp-oublie/mdp-oublie.component';
import {User} from "../shared/interface/user.interface";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../shared/services/user.service";
import {environment as env} from "../../environments/environment";

@Component({
  selector: 'app-modal-pro',
  templateUrl: './modal-pro.component.html',
  styleUrls: ['./modal-pro.component.scss']
})
export class ModalProComponent implements OnInit {
  userDetails! :any;
  err:number = 0;
  showPassword=false;
  formLogin!:FormGroup;
  formLoginSubmitted = false;
  isAdmin!:boolean;
  isLogged!:boolean;
  isUser!:boolean;
  currentUser:any;
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal,private fb:FormBuilder,
              private http:HttpClient,private userServ:UserService,private router: Router) {
  };
  //affiche ou masque le le mdp
  changeTypePassword() {
    this.showPassword = !this.showPassword;
  }
  /****************************
   MODALS
   ***************************/
  //ouvre la modal de connexion
  open() {
    this.modalService.open(ModalProComponent);
  }
  //ouvre la modal mot de passe oublié

  mdp() {
    this.modalService.open(MdpOublieComponent, {
      size: 'lg'
    });
  }



loginUser(){
  this.userServ.loginUser(this.formLogin);
  this.formLoginSubmitted = false;
  this.isLogged = this.userServ.getIsLogged();
  this.isAdmin = this.userServ.getIsAdmin();
  this.activeModal.close();
  this.formLogin.reset();
}
  getUserDetails(currentUser: any){
    sessionStorage.setItem('userId',this.currentUser[0].id);
    for (let garage of this.currentUser[0].garages ){
      let i = 1;
      sessionStorage.setItem('garageId'+ i,garage.id);
      i++;
    }
    for (let ClassifiedAd of this.currentUser[0].ClassifiedAd ){
      let i = 1;
      sessionStorage.setItem('ClassifiedAd'+ i,ClassifiedAd.id);
      i++;
    }console.log(sessionStorage)
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

}



