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

  currentUser:any;public error!: string;
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
this.formLoginSubmitted = true;
  this.userServ.connected(this.formLogin);
this.activeModal.close();
  this.formLogin.reset();

}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

}



