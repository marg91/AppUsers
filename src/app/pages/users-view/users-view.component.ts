import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BotonesComponent } from '../../components/botones/botones.component';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [BotonesComponent],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css'
})
export class UsersViewComponent {

  UserService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  
  miUser!: Iuser;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let _id: string = params._id as string;
      this.UserService.getById(_id)
        .then((userResponse: Iuser) => {
          this.miUser = userResponse;
        })
        .catch((err) => {
          console.log("Error al llamar a la API: " + err);
        });
    });
  }
}
