import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

// routing
import { AppRoutingModule } from './app-routing.module';
// modules
import { MaterialModule } from './modules/material.module';
// components
import { SingInComponent } from './pages/log/sing-in/sing-in.component';
import { SingUpComponent } from './pages/log/sing-up/sing-up.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
// providers
import { AuthService } from './providers/auth.service';
import { DataBaseUserService } from './providers/data-base-user.service';

// guards
import { AccessGuar } from './guards/access.guard';

// http
import { HttpClientModule } from '@angular/common/http';

// maps
import { AgmCoreModule } from '@agm/core';

// components
import { RutaComponent } from './pages/admin/ruta/ruta.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminRutasComponent } from './pages/admin/admin-rutas/admin-rutas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';
import { MapsDistanceComponent } from './components/maps-distance/maps-distance.component';
import { PopMapComponent } from './components/pop-map/pop-map.component';

@NgModule({
  entryComponents: [    PopMapComponent
  ],
  declarations: [
    AppComponent,
    SingInComponent,
    SingUpComponent,
    NotFound404Component,
    HomeComponent,
    RutaComponent,
    AdminUsersComponent,
    AdminRutasComponent,
    ProfileComponent,
    NavbarComponent,
    IndexComponent,
    MapsDistanceComponent,
    PopMapComponent

  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBU0vDPbBeS_viSnjd4SvxjAUe0AY0JIzk'
    }),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,

  ],
  providers: [AuthService, DataBaseUserService, AccessGuar],
  bootstrap: [AppComponent]
})
export class AppModule { }
