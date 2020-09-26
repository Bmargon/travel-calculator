import { Component, OnInit } from '@angular/core';
import { MapsService} from '../../../providers/maps.service';
@Component({
  selector: 'app-admin-rutas',
  templateUrl: './admin-rutas.component.html',
  styleUrls: ['./admin-rutas.component.scss']
})
export class AdminRutasComponent implements OnInit {

  ruta;
  rutasOn = [];
  rutasOff = [];

  constructor(private maps: MapsService) {
    this.maps.getRUtas().subscribe( (rutas: any) => {
      rutas.forEach(element => {
       if (element.payload.doc._document.proto.fields.activa.booleanValue === true) {
        this.rutasOn.push(element);
        console.log(this.rutasOn);
       } else {
         this.rutasOff.push(element);
       }
      });
    });
  }

  completar(index) {

    const ruta = {
      origenRuta:    this.rutasOn[index].payload.doc._document.proto.fields.origenRuta.stringValue,
      latO:      this.rutasOn[index].payload.doc._document.proto.fields.latO.doubleValue,
      altO:      this.rutasOn[index].payload.doc._document.proto.fields.altO.doubleValue,
      destinoRuta:   this.rutasOn[index].payload.doc._document.proto.fields.destinoRuta.stringValue,
      latD:      this.rutasOn[index].payload.doc._document.proto.fields.latD.doubleValue,
      altD:      this.rutasOn[index].payload.doc._document.proto.fields.altD.doubleValue,
      duracion:  this.rutasOn[index].payload.doc._document.proto.fields.duracion.stringValue,
      distancia: this.rutasOn[index].payload.doc._document.proto.fields.distancia.stringValue,
      activa:    this.rutasOn[index].payload.doc._document.proto.fields.activa.booleanValue
    };

    this.rutasOn[index].payload.doc._document.proto.fields.activa.booleanValue = false;

    this.maps.actualizarRuta(this.rutasOn[index].payload.doc.id, ruta);
    this.rutasOn.slice(index);
  }
  ngOnInit() {
  }


}
