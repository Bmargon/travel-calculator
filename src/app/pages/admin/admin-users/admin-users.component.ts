import { Component, OnInit } from '@angular/core';
import { DataBaseUserService } from 'src/app/providers/data-base-user.service';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  usuarios = [];

  constructor( private dbu: DataBaseUserService, private router: Router, private auth: AuthService) {
    this.dbu.getUsers().subscribe( users => {
      this.usuarios = users;
      console.log(this.usuarios);
    });
  }

  ngOnInit() {
  }

  borrarUsuario( index: string) {
    const token: string = this.usuarios[index].payload.doc.id;
    this.dbu.deleteUserDB(token);
    console.log(token);

  }

  editarUsuario( index: string ) {
    this.router.navigate(['/home', 'profile', this.usuarios[index].payload.doc.id]);
  }
}
