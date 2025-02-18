import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);
  baseUrl: string = "https://peticiones.online/api/users";

  constructor() {}

  getAll(): Promise<Iuser[]> {
    return lastValueFrom(
      this.httpClient.get<{results: Iuser[]}>(this.baseUrl)
    ).then(response => response.results ); 
  }

  getById(_id: string): Promise<Iuser> {
    return lastValueFrom(this.httpClient.get<Iuser>(`${this.baseUrl}/${_id}`));
  }

  deleteById(_id: string): Promise<Iuser> {
    return lastValueFrom(this.httpClient.delete<Iuser>(`${this.baseUrl}/${_id}`));
  }

  insertUsuario(usuario: Iuser): Promise<Iuser> {
    return lastValueFrom(this.httpClient.post<Iuser>(this.baseUrl, usuario));
  }

  updateUsuario(usuario: Iuser): Promise<Iuser> {
    return lastValueFrom(this.httpClient.put<Iuser>(`${this.baseUrl}/${usuario._id}`, usuario));
  }
}