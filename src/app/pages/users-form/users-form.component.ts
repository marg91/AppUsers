import { Component, inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {
router = inject(Router);
UserService = inject(UserService);
activatedRoute = inject(ActivatedRoute);

userForm: FormGroup;
tipo: string;

constructor(){
  this.tipo = "Insertar";
  this.userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.min(3)]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/)]),
    image: new FormControl('', [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
    password: new FormControl('', [Validators.required]),
  },

  []);
}

ngOnInit(): void {
  this.activatedRoute.params.subscribe(async (params: any) => {
    if (params._id) {
      this.tipo = "Actualizar"
      const userResponse : Iuser = await this.UserService.getById(params._id);

      this.userForm = new FormGroup({
        _id: new FormControl(userResponse._id, []),
        first_name: new FormControl(userResponse.first_name, [Validators.required]),
        last_name: new FormControl(userResponse.last_name, [Validators.required]),
        username: new FormControl(userResponse.username, [Validators.required, Validators.min(0), Validators.max(10)]),
        email: new FormControl(userResponse.email, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/)]),
        image: new FormControl(userResponse.image, [Validators.required, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/)]),
        pasword: new FormControl(userResponse.password,[Validators.required])
      }, []);
    }
  });
}
getDataForm() {

    let usuario: Iuser = this.userForm.value;
    console.log('Formulario antes de la actualización:', usuario); 
  
    if (this.userForm.valid) {
      if (this.tipo === "Actualizar") {
        this.UserService.updateUsuario(usuario)
          .then((_response: any): void => {
            alert(`El usuario ${_response.username} se ha actualizado correctamente`);
            this.router.navigate(['/home']);
          })
          .catch((error: any): void => {
            alert(`Error al actualizar el usuario`);
          });
      } else {
        this.UserService.insertUsuario(usuario)
          .then((_response: any): void => {
            alert(`El usuario ${_response.username} se ha insertado correctamente`);
            this.router.navigate(['/home']);
          })
          .catch((error: any): void => {
            alert(`Error al insertar el usuario`);
          });
        }
      }
    }       

  camposRequeridos(FormControlName: string, validators: string): boolean | undefined {
            return this.userForm.get(FormControlName)?.hasError(validators) 
            && this.userForm.get(FormControlName)?.touched;
          }
}


