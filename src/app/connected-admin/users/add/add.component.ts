import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    addUserForm: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder, private userService: UserService) { }
  
    ngOnInit(): void {
      this.addUserForm = this.formBuilder.group({
          title: new FormControl("",[Validators.required, Validators.minLength(4)]),
          firstName: new FormControl("",[Validators.required, Validators.minLength(4)]),
          lastName: new FormControl("",[Validators.required, Validators.minLength(4)]),
          username: new FormControl("",[Validators.required, Validators.minLength(4)]),
          email: new FormControl("",[Validators.required,Validators.email]),
          phoneNumber: new FormControl("",[Validators.required]),
          siret: new FormControl("",[Validators.required, Validators.minLength(14)]),
          password: new FormControl("",[Validators.required, Validators.minLength(4)]),
          passwordConfirm: new FormControl("",[Validators.required, Validators.minLength(4)])
      });
    }
  
    addUser() {
      this.userService.newUser(this.addUserForm.value).subscribe(data => {
        console.log('User added');
  
      }, err => {
        console.log(err);
  
      });
  
    }

}
