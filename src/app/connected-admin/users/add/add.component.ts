// noinspection ES6UnusedImports

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
    addUserForm: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder, private userService: UserService) { }

    ngOnInit(): void {
      this.addUserForm = this.formBuilder.group({
          title: ["",[Validators.required, Validators.minLength(4)]],
          firstName: ["",[Validators.required, Validators.minLength(4)]],
          lastName: ["",[Validators.required, Validators.minLength(4)]],
          username: ["",[Validators.required, Validators.minLength(4)]],
          email: ["",[Validators.required,Validators.email]],
          phoneNumber: ["",[Validators.required]],
          siret: ["",[Validators.required, Validators.minLength(14)]],
          password: ["",[Validators.required, Validators.minLength(4)]],
          passwordConfirm: ["",[Validators.required, Validators.minLength(4)]]
      });
    }

    addUser() {
      this.subs.add(this.userService.newUser(this.addUserForm.value).subscribe(data => {

      }, err => {
        console.log(err);

      })
      );
    }
    ngOnDestroy(): void {
      if (this.subs) this.subs.unsubscribe();
    }

}
