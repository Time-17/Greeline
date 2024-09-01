import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/fornecedor";
  
  constructor() { }

  save(fornecedor: Fornecedor): Observable<string>{
    return this.http.post<string>(this.API+"/save", fornecedor, {responseType: 'text' as 'json'});
  }

  update(fornecedor: Fornecedor, idFornecedor: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+idFornecedor, fornecedor, {responseType: 'text' as 'json'});
  }

  listAll(): Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.API+"/listAll");
  }

  findById(idFornecedor: number): Observable<Fornecedor>{
    return this.http.get<Fornecedor>(this.API+"/findById/"+idFornecedor);
  }


  delete(idFornecedor: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+idFornecedor, {responseType: 'text' as 'json'});
  }

  

}
