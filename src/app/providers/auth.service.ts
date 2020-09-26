import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CredencialesUsuaio } from '../models/usuario.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
                this.leerToken();
   }
  // vars
  public url = 'https://www.googleapis.com/identitytoolkit/v3';
  private key = 'AIzaSyCm0YmNKrFhR_gqvXgBAOjSjNkX49vlS7Q';
  token;

  nuevoUsuario( usuario ) {
    const url = `${this.url}/relyingparty/signupNewUser?key=${this.key}`;
    const authData: CredencialesUsuaio = {
      email: usuario.email,
      password: usuario.pass,
      returnSecureToken: true
    };
    return this.http.post(url, authData).pipe(map( resp => resp));
  }

  logIn(usuario) {
    const url = `${this.url}/relyingparty/verifyPassword?key=${this.key}`;
    const authData: CredencialesUsuaio = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(url, authData).pipe(map( (data: any) => {
      this.token = data.idToken;
      localStorage.setItem('token', this.token);

      console.log(data);
      return data;
    }));
  }
  leerToken() {
    if ( localStorage.getItem('token'))  {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    if ( this.token.lenght > 2 ) {
      return false;
    } else {
      return true;
    }
  }
  // borrar

}
