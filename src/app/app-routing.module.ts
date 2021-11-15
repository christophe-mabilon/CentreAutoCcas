import { UserGuard } from './shared/guards/user.guard';
import {CguComponent} from './cgu/cgu.component';
import {PolitiqueDeConfComponent} from './footer/politique-de-conf/politique-de-conf.component';
import {ContactComponent} from './contact/contact.component';
import {MainComponent} from './main/main.component';
import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MdpOublieComponent} from './mdp-oublie/mdp-oublie.component';
import {AnnoncesDetailsComponent} from './annonces-details/annonces-details.component';
import {ConnectedUserComponent} from './connected-user/connected-user.component';
import {ConnectedAdminComponent} from './connected-admin/connected-admin.component';
import {AnnoncesComponent} from "./annonces/annonces.component";
import {GaragesUserComponent} from "./connected-user/Garages/garages-user/garages-user.component";
import {AnnoncesUserComponent} from "./connected-user/Annonces/annonces-user/annonces-user.component";
import {AddGarageUserComponent} from "./connected-user/Garages/add-garage-user/add-garage-user.component";
import {AddAnnonceUserComponent} from "./connected-user/Annonces/add-annonce-user/add-annonce-user.component";
import {EditAnnonceUserComponent} from "./connected-user/Annonces/annonces-user/edit-annonce-user/edit-annonce-user.component";
import { AddComponent } from './connected-admin/users/add/add.component';
import { DeleteComponent } from './connected-admin/users/delete/delete.component';
import { EditComponent } from './connected-admin/users/edit/edit.component';
import {ListeUsersComponent} from "./connected-admin/users/liste/liste.component";
import {DetailsComponent} from "./connected-admin/users/details/details.component";
import { EditUserComponent } from './connected-user/User/edit-user/edit-user.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';

export const routes: Routes = [
  {path: 'home', component: MainComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'Mentions_Legales', component: MentionsLegalesComponent},
  {path: 'Mot_de_passe_oublie', component: MdpOublieComponent},
  {path: 'Politiques_De_Confidentialites', component: PolitiqueDeConfComponent},
  {path: 'C_G_U', component: CguComponent},
  {path: ":annonce/:id", component: AnnoncesDetailsComponent},
  {path: "annonces", component: AnnoncesComponent},
  /** path user */
  {path: 'connectedUser',component: ConnectedUserComponent,canActivate: [UserGuard]},
  {path: 'detailsUser/:id', component: DetailsComponent,canActivate: [UserGuard]},
  {path: 'edit/user/:id', component: EditUserComponent,canActivate: [UserGuard]},
  {path: 'garagesUser', component: GaragesUserComponent,canActivate: [UserGuard]},
  {path: 'garage/edit/:id', component: AddGarageUserComponent,canActivate: [UserGuard]},
  {path: "annonce/edit/:id", component: EditAnnonceUserComponent,canActivate: [UserGuard]},
  {path: 'annoncesUser', component: AnnoncesUserComponent,canActivate: [UserGuard]},
  {path: 'addGarageUser', component: AddGarageUserComponent,canActivate: [UserGuard]},
  {path: 'addAnnonceUser', component: AddAnnonceUserComponent,canActivate: [UserGuard]},
  /** path admin */
  {path: 'connectedAdmin', component: ConnectedAdminComponent,canActivate: [AdminGuard]},
  {path: 'liste/user', component: ListeUsersComponent,canActivate: [AdminGuard]},
  {path: 'addUser', component: AddComponent,canActivate: [AdminGuard]},
  {path: 'deleteUser/:id', component: DeleteComponent,canActivate: [AdminGuard]},
  {path: 'editUser/:id', component: EditComponent,canActivate: [AdminGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
