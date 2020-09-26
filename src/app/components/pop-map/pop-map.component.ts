import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapsService } from 'src/app/providers/maps.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-pop-map',
  templateUrl: './pop-map.component.html',
  styleUrls: ['./pop-map.component.scss']
})
export class PopMapComponent implements OnInit {

  ruta;
  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private maps: MapsService) {
              this.ruta = this.data;
              console.log(this.ruta);
                        }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
    Swal.fire({
      title: 'Ruta Cancelada',
      type: 'info',
      confirmButtonText: 'Continuar'
    });
  }
  confirm() {
    this.maps.agregarRuta(this.ruta);
    this.dialogRef.close();
    Swal.fire({
      title: 'Ruta creada correctamente!',
      type: 'success',
      confirmButtonText: 'Continuar'
    });
  }
}
