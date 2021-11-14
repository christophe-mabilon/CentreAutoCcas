import { error } from '@angular/compiler/src/util';
import { Observer } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
currentUser!:User;
isAdmin = false;
submitted =false;
public error!: string;
public editCurrentUser = this.fb.group({
  username:["", Validators.required],
  password:["", Validators.required],
  passwordConfirm:["", Validators.required],
  title:["", Validators.required],
 firstname:["", Validators.required],
  lastName:["", Validators.required],
  phoneNumber:["", Validators.required],
  email:["", Validators.required],
  society:["",Validators.required],
  adresse:["",Validators.required],
  codePostal:["",Validators.required],
  ville:["",Validators.required],
  siret:["",Validators.required]

})

  constructor(private route: ActivatedRoute,private userserv:UserService,private fb:FormBuilder,private router:Router) { }
patchValues(currentUser:User){
  this.editCurrentUser.patchValue({
    username:currentUser.username,
    password:currentUser.password,
    passwordConfirm:currentUser.passwordconfirm,
    title:currentUser.title,
   firstname:currentUser.firstName,
    lastName:currentUser.lastName,
    phoneNumber:currentUser.phoneNumber,
    email:currentUser.email,
    society:currentUser.society,
    adresse:currentUser.adresse,
    codePostal:currentUser.codePostal,
    ville:currentUser.ville,
    siret:currentUser.siret
  })
}




  editUser(){
    this.submitted = true;
    if(this.editCurrentUser.valid){console.log(this.editCurrentUser.value)
      this.userserv.updateUser(this.currentUser.id,this.editCurrentUser.value).subscribe(()=>{
        if(this.currentUser.roles.toString() === "ROLE_ADMIN"){

          this.router.navigate(['/connectedAdmin']);
        }
        else{
this.router.navigate(['/connectedUser']);
        }
      },(err)=>{
        this.error = err?.error || 'Il y a eu un petit probleme merci de recommencer votre saisie';
      })
    }
    this.editCurrentUser.reset;
}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userserv.showUser(id).subscribe((user:User)=>{
this.currentUser = user;this.patchValues(this.currentUser);
    });
    if(localStorage.getItem('IsAdmin') === 'true'){
      this.isAdmin=true;
    }


}

}
