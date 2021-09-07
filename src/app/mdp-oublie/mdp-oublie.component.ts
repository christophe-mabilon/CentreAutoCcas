import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProComponent } from '../modal-pro/modal-pro.component';

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.component.html',
  styleUrls: ['./mdp-oublie.component.scss']
})
export class MdpOublieComponent implements OnInit {
 //afficher mdp
 showPassword = false;

 constructor(private modalService: NgbModal,
   public activeModal: NgbActiveModal) {

   };

 ngOnInit(): void {

 }

 open() {
   this.modalService.open(ModalProComponent);
 }
 changeTypePassword(){
   this.showPassword = !this.showPassword;
 }


}
