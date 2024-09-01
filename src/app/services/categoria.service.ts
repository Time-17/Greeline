import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/categoria";
  
  constructor() { }

  listAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API + "/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API + "/delete/" + id, {responseType: 'text' as 'json'});
  }

  save(categoria: Categoria): Observable<string>{
    return this.http.post<string>(this.API + "/save", categoria, {responseType: 'text' as 'json'});
  }

  update(categoria: Categoria, id: number): Observable<string>{
    return this.http.put<string>(this.API + "/update/"+id, categoria, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.API + "/findById/"+id);
  }
  
}
