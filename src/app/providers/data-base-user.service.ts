import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataBaseUserService {

  private usuariosCollection: AngularFirestoreCollection<Usuario>;
  usuarios: Observable<Usuario[]>;

  constructor(private afs: AngularFirestore) {

    this.usuariosCollection = afs.collection<Usuario>('Usuarios');
    this.usuarios = this.usuariosCollection.valueChanges();
  }

  annadirUser(key, usuario: any) {
   return this.usuariosCollection.doc(key).set(usuario);
  }

  // info usuario
  getUser(id: string) {
    return this.afs.collection('Usuarios').doc(id).snapshotChanges().pipe(map( (data: any) => {
      return data.payload._document.proto.fields;
    }));
  }

  // actualizarUsuario
  updateUser(id: string, usuario: any) {
    this.afs.collection('Usuarios').doc(id).set(usuario);
  }

  // todos los usuarios
  getUsers() {
    return this.afs.collection('Usuarios').snapshotChanges();
  }
// borrar
  deleteUserDB(id) {
    return this.afs.collection('Usuarios').doc(id).delete();
  }
}

