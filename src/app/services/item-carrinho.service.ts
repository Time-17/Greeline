import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho';

import { Observable } from 'rxjs';
import { Carrinho } from '../models/carrinho';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemCarrinhoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+"/api/itemcarrinho";

  constructor() { }

  listAll(): Observable<ItemCarrinho[]>{
    return this.http.get<ItemCarrinho[]>(this.API+"/listAll");
  }

  save(itemCarrinho: ItemCarrinho): Observable<string>{
    return this.http.post<string>(this.API + "/save", itemCarrinho, {responseType: 'text' as 'json'});
  }
  
  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  update(itemCarrinho: ItemCarrinho, id: number): Observable<string>{
    return this.http.put<string>(this.API + "/update/"+id, itemCarrinho, {responseType: 'text' as 'json'});
  }

  getCarrinhoByUser(idUsuario: number): Observable<Carrinho>{
    return this.http.get<Carrinho>(this.API+"/getCarrinhoByUser?idUsuario="+idUsuario);
  }
}
