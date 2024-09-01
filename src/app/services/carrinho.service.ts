import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrinho } from '../models/carrinho';
import { VendasMensais } from '../models/vendas-mensais';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/carrinho";
  
  constructor() { }

  listAll(): Observable<Carrinho[]>{
    return this.http.get<Carrinho[]>(this.API + "/listAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API + "/delete/" + id, {responseType: 'text' as 'json'});
  }

  ListVendasByMonthForLast12Months(): Observable<VendasMensais[]>{
    return this.http.get<VendasMensais[]>(this.API + "/ListVendasByMonthForLast12Months");
  }

  getVendasFinalizadas(): Observable<Carrinho[]>{
    return this.http.get<Carrinho[]>(this.API + "/getVendasFinalizadas");
  }
  
  save(carrinho: Carrinho): Observable<string>{
    return this.http.post<string>(this.API + "/save", carrinho, {responseType: 'text' as 'json'});
  }
  
}
