import {CguComponent} from './cgu/cgu.component';
import {PolitiqueDeConfComponent} from './footer/politique-de-conf/politique-de-conf.component';
import {ContactComponent} from './contact/contact.component';
import {MainComponent} from './main/main.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MdpOublieComponent} from './mdp-oublie/mdp-oublie.component';
import {MentionsLegalesComponent} from './footer/mentions-legales/mentions-legales.component';
import {AnnoncesDetailsComponent} from './annonces-details/annonces-details.component';
import {ConnectedUserComponent} from './connected-user/connected-user.component';
import {ConnectedAdminComponent} from './connected-admin/connected-admin.component';
import {AnnoncesComponent} from "./annonces/annonces.component";
import {GaragesUserComponent} from "./connected-user/garages-user/garages-user.component";
import {AnnoncesUserComponent} from "./connected-user/annonces-user/annonces-user.component";
import {VehiculesUserComponent} from "./connected-user/vehicules-user/vehicules-user.component";
import {AddGarageUserComponent} from "./connected-user/add-garage-user/add-garage-user.component";
import {AddAnnonceUserComponent} from "./connected-user/add-annonce-user/add-annonce-user.component";
import {AnnonceByGarageComponent} from "./connected-user/annonce-by-garage/annonce-by-garage.component";
import {EditAnnonceUserComponent} from "./connected-user/edit-annonce-user/edit-annonce-user.component";
import {EditGarageUserComponent} from "./connected-user/edit-garage-user/edit-garage-user.component";
import { AddComponent } from './connected-admin/users/add/add.component';
import { DeleteComponent } from './connected-admin/users/delete/delete.component';
import { EditComponent } from './connected-admin/users/edit/edit.component';
import {ListeUsersComponent} from "./connected-admin/users/liste/liste.component";
import {DetailsComponent} from "./connected-admin/users/details/details.component";

export const routes: Routes = [

  {path: 'home', component: MainComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'connectedUser', component: ConnectedUserComponent},
  {path: 'garagesUser', component: GaragesUserComponent},
  {path: 'garage/edit/:id', component: EditGarageUserComponent},
  {path: 'annoncesByGarage', component: AnnonceByGarageComponent},
  {path: 'annoncesUser', component: AnnoncesUserComponent},
  {path: 'vehiculesUser', component: VehiculesUserComponent},
  {path: 'addGarageUser', component: AddGarageUserComponent},
  {path: 'addAnnonceUser', component: AddAnnonceUserComponent},
  {path: 'connectedAdmin', component: ConnectedAdminComponent},
  {path: 'liste', component: ListeUsersComponent},
  {path: 'addUser', component: AddComponent},
  {path: 'deleteUser/:id', component: DeleteComponent},
  {path: 'detailsUser/:id', component: DetailsComponent},
  {path: 'editUser/:id', component: EditComponent},
  {path: "annonces", component: AnnoncesComponent},
  {path: ":annonce/:id", component: AnnoncesDetailsComponent},
  {path: ":annonce/edit/:id", component: EditAnnonceUserComponent},
  {path: 'Mentions_Legales', component: MentionsLegalesComponent},
  {path: 'Politiques_De_Confidentialites', component: PolitiqueDeConfComponent},
  {path: 'C_G_U', component: CguComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
