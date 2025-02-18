import { Component, Input } from '@angular/core';
import { Iuser } from '../../interfaces/iuser';
import { BotonesComponent } from "../botones/botones.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [BotonesComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
 @Input() miUser!: Iuser;
}
