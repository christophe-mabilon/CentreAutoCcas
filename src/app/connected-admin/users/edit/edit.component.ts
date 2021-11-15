import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
    userId: any;
    userDetails: any;
    editUserForm: FormGroup = new FormGroup({});
    dataLoaded = false;

    constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) { }



    updateUser() {
      this.subs.add(this.userService.updateUser(this.userId, this.editUserForm.value).subscribe(data => {
        console.log('Edit was successfull');

      }, err => {
        console.log('Error'!);

      }));

    }
    ngOnInit(): void {
      this.dataLoaded = false;
      this.subs.add(this.route.params.subscribe(data => {
        this.userId = data.id;
      }));

      if (this.userId !== '') {
        this.userService.showUser(this.userId)
          .toPromise().then(data => {
            this.userDetails = data;
            Object.assign(this.userDetails, data);

            // Build edit form
            this.editUserForm = this.formBuilder.group({
              title: new FormControl(this.userDetails.title),
              firstName: new FormControl(this.userDetails.firstName),
              lastName: new FormControl(this.userDetails.lastName),
              username: new FormControl(this.userDetails.username),
              email: new FormControl(this.userDetails.email),
              phoneNumber: new FormControl(this.userDetails.phoneNumber),
              siret: new FormControl(this.userDetails.siret),
              password: new FormControl(this.userDetails.password),
              passwordConfirm: new FormControl(this.userDetails.passwordConfirm)
            });
            this.dataLoaded = true;
          })

          .catch(err => {
            console.log(err);

          });
      }
    }

    ngOnDestroy(): void {
      if (this.subs) this.subs.unsubscribe();
    }
}
