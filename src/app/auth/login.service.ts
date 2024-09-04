import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Usuario } from './usuario';
import { Autenticador } from './autenticador';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = environment.SERVIDOR+"/api/usuario";


  constructor() { }


  login(loginData: Autenticador): Observable<string> {
    console.log('Dados de login:', loginData);
    return this.http.post<string>(this.API+"/login", loginData, {responseType: 'text' as 'json'}); // Envie o objeto Login completo no corpo da solicitação
  }

  findByLoginId(idLoginLogado: number): Observable<Login>{
    return this.http.get<Login>(this.API+"/findByLoginId/"+idLoginLogado);
  }


  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Login;
    if (user.role == role)
      return true;
    else
      return false;
  }

  getUsuarioLogado(){
    return this.jwtDecode() as Login;
  }


}
