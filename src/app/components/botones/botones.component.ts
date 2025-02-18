import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent {
  userService = inject(UserService);
  router = inject(Router);
  @Input() _id: string;
  @Input() parent: string;
  @Input() username: string;

  constructor(){
    this._id= "";
    this.username= "";
    this.parent ="";
  }
  async borrar(_id: string) {
    let confirmacion = confirm(' ¿Deseas borrar al usuario: ' + this._id + '?');
    if (confirmacion) {
      let response = await this.userService.deleteById(_id);

      if (response._id) {
        alert('El usuario ha sido borrado correctamente ' + response.username);
        if (this.parent == 'view') {
          this.router.navigate(['/home']);
        }
        else if(this.parent == "card" ){
          location.reload();
        }
      }
    }
    
  }
}