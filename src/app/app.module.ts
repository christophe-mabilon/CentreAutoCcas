import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PolitiqueDeConfComponent } from './footer/politique-de-conf/politique-de-conf.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarSearchComponent } from './navbar-search/navbar-search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalProComponent } from './modal-pro/modal-pro.component';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import { MarqueComponent } from './navbar-search/marque/marque.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { CguComponent } from './cgu/cgu.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { ConnectedUserComponent } from './connected-user/connected-user.component';
import { ConnectedAdminComponent } from './connected-admin/connected-admin.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, DatePipe} from "@angular/common";
import { AddAnnonceUserComponent } from './connected-user/add-annonce-user/add-annonce-user.component';
import { AddGarageUserComponent } from './connected-user/add-garage-user/add-garage-user.component';
import { GaragesUserComponent } from './connected-user/garages-user/garages-user.component';
import { VehiculesUserComponent } from './connected-user/vehicules-user/vehicules-user.component';
import { AnnoncesUserComponent } from './connected-user/annonces-user/annonces-user.component';
import { MarqueService } from './shared/services/marque.service';
import { AuthService } from './shared/services/auth.service';
import { AnnoncesDetailsComponent } from './annonces-details/annonces-details.component';
import {ModelService} from "./shared/services/model.service";
import {RegionService} from "./shared/services/region.service";
import {routes} from "./app-routing.module";
import{CarousselConfigComponent} from './annonces-details/caroussel-config/caroussel-config.component';
import { AnnonceByGarageComponent } from './connected-user/annonce-by-garage/annonce-by-garage.component';
import {NavbarComponentUser} from "./connected-user/navbar-user/navbar.component";
import { EditAnnonceUserComponent } from './connected-user/edit-annonce-user/edit-annonce-user.component';
import { EditGarageUserComponent } from './connected-user/edit-garage-user/edit-garage-user.component';
import { BooleanPipe } from './shared/pipes/boolean.pipe';
import { UploadComponent } from './upload/upload.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from '@angular/material/icon'
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AddComponent } from './connected-admin/users/add/add.component';
import { DeleteComponent } from './connected-admin/users/delete/delete.component';
import { EditComponent } from './connected-admin/users/edit/edit.component';
import { DetailsComponent } from './connected-admin/users/details/details.component';
import { NavbarAdminComponent } from './connected-admin/navbar-admin/navbar-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserService } from './shared/services/user.service';
import { GarageService } from './shared/services/garage.service';
import { AnnoncesService } from './shared/services/annonces.service';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import { ListeUsersComponent} from './connected-admin/users/liste/liste.component';
import {IconsModule, TableModule} from "ng-uikit-pro-standard";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    PolitiqueDeConfComponent,
    PageNotFoundComponent,
    NavbarSearchComponent,
    NavbarComponent,
    ModalProComponent,
    MentionsLegalesComponent,
    MdpOublieComponent,
    MarqueComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    CguComponent,
    AnnoncesDetailsComponent,
    ConnectedUserComponent,
    ConnectedAdminComponent,
    AnnoncesComponent,
    AddAnnonceUserComponent,
    AddGarageUserComponent,
    AddAnnonceUserComponent,
    AddGarageUserComponent,
    GaragesUserComponent,
    VehiculesUserComponent,
    AnnoncesUserComponent,
    NavbarComponentUser,
    CarousselConfigComponent,
    AnnonceByGarageComponent,
    EditAnnonceUserComponent,
    EditGarageUserComponent,
    BooleanPipe,
    UploadComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    DetailsComponent,
    NavbarAdminComponent,
    ListeUsersComponent,

  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule,
        NgxSliderModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        TableModule,
        IconsModule,
        MatCheckboxModule,
        MatCardModule,
    ],
  providers: [MarqueService,
    RegionService,
    ModelService,
    UserService,
    AnnoncesService,
    GarageService,
    NgbCarouselConfig,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    DatePipe,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }


