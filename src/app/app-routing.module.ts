import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingInComponent } from './pages/log/sing-in/sing-in.component';
import { SingUpComponent } from './pages/log/sing-up/sing-up.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { HomeComponent } from './pages/home/home.component';
import { AccessGuar} from './guards/access.guard';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { RutaComponent } from './pages/admin/ruta/ruta.component';
import { AdminRutasComponent } from './pages/admin/admin-rutas/admin-rutas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  {path: '', component: SingInComponent},
  {path: 'singIn', component: SingInComponent},
  {path: 'singUp', component: SingUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AccessGuar], children: [
   {path: 'index/:id', component: IndexComponent, children: [
     {path: 'adminUsers', component: AdminUsersComponent},
     {path: 'rutes', component: RutaComponent},
     {path: 'adminRutes', component: AdminRutasComponent }
   ]},
   {path: 'profile/:id', component: ProfileComponent}

  ]},
  {path: '404', component: NotFound404Component},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
