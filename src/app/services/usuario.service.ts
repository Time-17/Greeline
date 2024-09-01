import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   API_USUARIO = environment.SERVIDOR+'/api/cliente';

   http = inject(HttpClient);

  findByUsuarioId(idUsuarioLogado: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API_USUARIO+"/findByUsuarioId/"+idUsuarioLogado);
  }

  update(usuario: Usuario, idCliente: number): Observable<string>{
    return this.http.put<string>(this.API_USUARIO+"/update/"+idCliente, usuario,  {responseType: 'text' as 'json'});

  }
  save(usuario: Usuario): Observable<string>{
    return this.http.post<string>(this.API_USUARIO+"/save", usuario,  {responseType: 'text' as 'json'});

  }

}
