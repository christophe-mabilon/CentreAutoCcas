import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!:FormGroup;
  formIsSubmit = false;
 genres = ["Mademoiselle","Madame","Monsieur"];
 types = ["Proffesionel","Particulier"];
 dejaInsrcits =["Oui","Non"];
 demandes=["Inscription","Renseignements"]

  constructor(private fb:FormBuilder) {
    this.contactForm = this.fb.group({
      genre : ['', Validators.required],
      type :  ['', Validators.required],
      dejaInsrcit: ['', Validators.required],
      nom:["", Validators.required],
      prenom:["", Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      adresse:["", Validators.required],
      codePostal:["", Validators.required],
      ville:["", Validators.required],
      demande:["", Validators.required],
      message:["", Validators.required]
  })

 }

get f(){
      return this.contactForm.controls;
    }

    changeValue(e:any,formcontrolname:string){
this.contactForm.patchValue({
  formcontrolname : e.target.value
})
    }




  submitContactForm(){
    this.formIsSubmit =true;
console.log("submit function",this.contactForm.value);
  }
  ngOnInit(): void {
  }

}
