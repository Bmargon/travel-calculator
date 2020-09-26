import { Component, OnInit } from '@angular/core';
// form
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

// services
import { AuthService } from 'src/app/providers/auth.service';

// sweet

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataBaseUserService } from 'src/app/providers/data-base-user.service';
import { Router } from '@angular/router';

// rutas

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  constructor(private auth: AuthService,
              private baseUsuarios: DataBaseUserService,
              private router: Router) {}

  nuevoUsuario = new Usuario();
  form;
  cargando =  false;

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl(this.nuevoUsuario.nombre, [Validators.required, Validators.minLength(3)]),
      apellidoUno: new FormControl(this.nuevoUsuario.apellidoUno, [Validators.required, Validators.min(3)]),
      apellidoDos: new FormControl(this.nuevoUsuario.apellidoDos, Validators.required),
      role: new FormControl(this.nuevoUsuario.role, Validators.required),
      email: new FormControl(this.nuevoUsuario.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
      pass: new FormControl(this.nuevoUsuario.pass, Validators.required),
    });

  }

  crearUsuario() {
    this.cargando = true;
    this.auth.nuevoUsuario(this.form.value).subscribe( (data: any) => {
      if (data) {
        Swal.fire({
          title: 'Perfecto!',
          text: 'Usuario creado correctamente',
          type: 'success',
          confirmButtonText: 'Continuar'
        });
        const idKey: string = data.localId;
        this.baseUsuarios.annadirUser(idKey, this.form.value);
        this.cargando = false;

        setTimeout(() => {
          this.router.navigateByUrl('/singIn');
        }, 1000);
      }
    }, (error) => {
      console.error(error);
      Swal.fire({
        title: 'Algo fue mal...',
        text: error.error.error.errors['0'].message,
        type: 'error',
        confirmButtonText: 'Reintentar'
      });
      this.cargando = false;

    });

  }

}
