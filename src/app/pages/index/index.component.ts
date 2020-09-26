import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBaseUserService } from 'src/app/providers/data-base-user.service';
import { MapsService } from 'src/app/providers/maps.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  admin = false;
  infoUser: any;
  url: string;
  nombre: string;
  role;
  rutasActivas = [];
  rutasOff = [];
  constructor( private active: ActivatedRoute, private dbu: DataBaseUserService, private mapsService: MapsService) {

    this.active.params.subscribe( (url: any) => {

        this.url = url.id;
        this.dbu.getUser(this.url).subscribe( (user: any) => {
          this.nombre = user.nombre.stringValue;
          this.infoUser = user;
          this.role = user.role.stringValue;


          if (this.role === 'administracion') {
            this.admin = true;
            return;
          }
          console.log(this.infoUser);
        });
    });
  }

  ngOnInit() {

      this.mapsService.getRUtas().subscribe( (rutas: any) => {
        rutas.forEach(element => {

         if (element.payload.doc._document.proto.fields.activa.booleanValue === true) {
           this.rutasActivas.push(element);
           console.log( this.rutasActivas);
         } else {
          this.rutasOff.push(element);
          console.log( this.rutasOff);
          console.log('hola');
         }
       });
      });
  }


}
