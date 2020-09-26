import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ruta } from 'src/app/models/usuario.model';
import { MapsService } from 'src/app/providers/maps.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopMapComponent } from 'src/app/components/pop-map/pop-map.component';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss']
})
export class RutaComponent implements OnInit {


  form: FormGroup;
  dialogPop;

  ruta = {
    origenRuta: '',
    latO: '',
    altO: '',
    destinoRuta: '',
    latD: '',
    altD: '',
    duracion: '',
    distancia: '',
    activa: true
  };

  constructor( private maps: MapsService, public dialog: MatDialog) {
    this.form = new FormGroup({
      origen: new FormControl('', Validators.required),
      destino: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }
  crearRuta() {
    const origen = this.form.value.origen;
    const destino = this.form.value.destino;



    // maps origen
    this.maps.getOrigen(origen).subscribe( (data: any) => {
      console.log(data);
      this.ruta.latO = data.geometry.location.lat;
      this.ruta.altO = data.geometry.location.lng;
      this.ruta.origenRuta = data.formatted_address;
    });
    // maps destino
    this.maps.getDestino(destino).subscribe( (data: any) => {
      console.log(data);
      this.ruta.latD = data.geometry.location.lat;
      this.ruta.altD = data.geometry.location.lng;
      this.ruta.destinoRuta = data.formatted_address;
    });

    this.maps.getDuration(origen, destino).subscribe( (data: any) => {
      console.log(data);
      this.ruta.distancia = data.distance.text;
      this.ruta.duracion = data.duration.text;
      this.openDialog();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopMapComponent, {
      width: '550px',
      data: {
        origenRuta: this.ruta.origenRuta,
        latO: this.ruta.latO,
        altO: this.ruta.altO,
        destinoRuta: this.ruta.destinoRuta,
        latD: this.ruta.latD,
        altD: this.ruta.altD,
        duracion: this.ruta.duracion,
        distancia: this.ruta.distancia,
        activa: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogPop = result;
    });
  }
}
