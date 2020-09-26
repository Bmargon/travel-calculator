import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ruta } from '../models/usuario.model';
import { database } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private APIkey = 'AIzaSyBU0vDPbBeS_viSnjd4SvxjAUe0AY0JIzk';

  private rutasCollection: AngularFirestoreCollection<Ruta>;
  rutas: Observable<Ruta[]>;

  constructor( private http: HttpClient, private afs: AngularFirestore ) {
    this.rutasCollection = afs.collection<Ruta>('Rutas');
    this.rutas = this.rutasCollection.valueChanges();
  }



  getOrigen( direccion: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${this.APIkey}`;
    return this.http.get(url).pipe(map( (infor: any) => {
      return infor.results[0];
    }));
    }
  getDestino(direccion: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${this.APIkey}`;
    return this.http.get(url).pipe(map( (infor: any) => {
      return infor.results[0];
    }));
  }

  getDuration(origen: string, destino: string) {
    const ruta = `/maps/api/distancematrix/json?&origins=${origen}&destinations=${destino}&key=${this.APIkey}`;
    return this.http.get(ruta).pipe(map( (data: any) => {
      return data.rows[0].elements[0];
    }));
  }

  agregarRuta(ruta: any) {
    return this.afs.collection('Rutas').add(ruta);
  }
  getRUtas() {
    return this.afs.collection('Rutas').snapshotChanges();
  }

  actualizarRuta(id: string, ruta) {
    return this.afs.collection('Rutas').doc(id).set(ruta);
  }
}

