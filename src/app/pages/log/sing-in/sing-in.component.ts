import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CredencialesUsuaio } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/providers/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { DataBaseUserService } from 'src/app/providers/data-base-user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private dbu: DataBaseUserService) {

  }
 credenciales = new CredencialesUsuaio();
 form: FormGroup;
 cargando = false;

  // form
  ngOnInit() {
    this.form = this.fb.group({
      email: [this.credenciales.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      password: [this.credenciales.password, Validators.required]
    });
  }

  logIn() {

    this.cargando = true;

    this.auth.logIn(this.form.value).subscribe( data => {
      const idKey = data.localId;
      this.cargando = false;
      localStorage.setItem('idKey', idKey);
      this.router.navigate(['home', 'index', idKey]);
    }, (error) => {
      Swal.fire({
        title: 'Algo ha ido mal...',
        text: error.error.error.errors['0'].message,
        type: 'error',
        confirmButtonText: 'Cerrar'
      });
      this.cargando = false;
    } );
  }


}
