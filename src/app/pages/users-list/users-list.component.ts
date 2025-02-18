import { Component, inject } from '@angular/core';
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  arrUsers: Iuser[];
  UserService = inject(UserService);
  paginaActual: number;
  usersPage: number;
  allPages: number;

  constructor() {
    this.arrUsers = [];
    this.paginaActual= 1;
    this.usersPage= 1;
    this.allPages=1;
  }
  async ngOnInit() {
    try {
      this.arrUsers = await this.UserService.getAll();
  
    } catch (error) {
      console.error("Error al cargar la API:", error);
    }
  }

  CalcularPaginas() {
    this.allPages = Math.ceil(this.arrUsers.length / this.usersPage);
  }

  get usuariosPorPagina(): Iuser[] {
    const inicio = (this.paginaActual - 1) * this.usersPage;
    return this.arrUsers.slice(inicio, inicio + this.usersPage);
  }

  siguientePagina() {
    if (this.paginaActual < this.allPages) {
      this.paginaActual++;
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }
}
