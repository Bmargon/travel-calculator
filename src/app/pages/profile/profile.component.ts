import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataBaseUserService } from 'src/app/providers/data-base-user.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  idKey: any;
  usuarioRecibido;

  private usuairo = {
    nombre: '',
    apellidoUno: '',
    apellidoDos: '',
    role: '',
    email: '',
    pass: ''
  };


  form: FormGroup;

  constructor( private dbu: DataBaseUserService,
               private route: Router,
               private active: ActivatedRoute) {

    this.active.params.subscribe( params => this.idKey = params.id);

    this.dbu.getUser(this.idKey).subscribe( (user: any) => {

      this.usuarioRecibido = user;
      this.form.setValue({
        nombre: this.usuarioRecibido.nombre.stringValue,
        apellidoUno: this.usuarioRecibido.apellidoUno.stringValue,
        apellidoDos: this.usuarioRecibido.apellidoDos.stringValue,
        role: this.usuarioRecibido.role.stringValue,
        email: this.usuarioRecibido.email.stringValue,
        pass: this.usuarioRecibido.pass.stringValue

      });
      console.log(this.usuarioRecibido);
    });


    this.form = new FormGroup({
      nombre: new FormControl(this.usuairo.nombre),
      apellidoUno: new FormControl(this.usuairo.apellidoUno),
      apellidoDos: new FormControl(this.usuairo.apellidoDos),
      role: new FormControl(this.usuairo.role),
      email: new FormControl(this.usuairo.email),
      pass: new FormControl(this.usuairo.pass)
    });
  }

  ngOnInit() {



  }

  actualizar() {
    console.log(this.form.value);
    this.dbu.updateUser(this.idKey, this.form.value);
    Swal.fire({
      title: 'Perfecto!',
      text: 'Usuario actualizado correctamente',
      type: 'success',
      confirmButtonText: 'Continuar'
    });
  }
}
