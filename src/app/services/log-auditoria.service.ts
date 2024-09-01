import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LogAuditoria } from '../models/log-auditoria';

@Injectable({
  providedIn: 'root',
})
export class LogAuditoriaService {
  http = inject(HttpClient);

  API = environment.SERVIDOR + '/api/log';

  constructor() {}

  listAll(): Observable<LogAuditoria[]> {
    return this.http.get<LogAuditoria[]>(this.API + '/listAll');
  }
  
  findLogsByCriterio(
    startDate?: Date,          // Parâmetro opcional para a data de início do intervalo de busca.
    endDate?: Date,            // Parâmetro opcional para a data de fim do intervalo de busca.
    acao?: string,             // Parâmetro opcional para filtrar por ação específica nos logs.
    roleUsuario?: string,      // Parâmetro opcional para filtrar por função do usuário.
    logName?: string,          // Parâmetro opcional para filtrar por nome do log.
    entity?: string,           // Parâmetro opcional para filtrar por entidade relacionada ao log.
    emailUsuario?: string      // Parâmetro opcional para filtrar por email do usuário.
  ): Observable<LogAuditoria[]> {  // O método retorna um Observable de um array de logs de auditoria.
  
    // Criamos um objeto HttpParams, que será usado para construir os parâmetros da URL da requisição.
    let params = new HttpParams();
    
    // Verifica se 'startDate' foi passado como argumento.
    if (startDate) {
      // Se 'startDate' existe, adiciona-o como parâmetro na URL. 
      // O método 'toISOString().slice(0, 19)' converte a data para o formato ISO e corta os milissegundos.
      params = params.set('startDate', startDate.toISOString().slice(0, 19));
    }
    
    // Verifica se 'endDate' foi passado como argumento.
    if (endDate) {
      // Se 'endDate' existe, adiciona-o como parâmetro na URL no mesmo formato ISO.
      params = params.set('endDate', endDate.toISOString().slice(0, 19));
    }
    
    // Verifica se 'acao' foi passada como argumento.
    if (acao) {
      // Se 'acao' existe, adiciona-o como parâmetro na URL.
      params = params.set('acao', acao);
    }
    
    // Verifica se 'roleUsuario' foi passado como argumento.
    if (roleUsuario) {
      // Se 'roleUsuario' existe, adiciona-o como parâmetro na URL.
      params = params.set('roleUsuario', roleUsuario);
    }
    
    // Verifica se 'logName' foi passado como argumento.
    if (logName) {
      // Se 'logName' existe, adiciona-o como parâmetro na URL.
      params = params.set('logName', logName);
    }
    
    // Verifica se 'entity' foi passada como argumento.
    if (entity) {
      // Se 'entity' existe, adiciona-o como parâmetro na URL.
      params = params.set('entity', entity);
    }
    
    // Verifica se 'emailUsuario' foi passado como argumento.
    if (emailUsuario) {
      // Se 'emailUsuario' existe, adiciona-o como parâmetro na URL.
      params = params.set('emailUsuario', emailUsuario);
    }

    // Faz uma requisição HTTP GET para a API, passando a URL e os parâmetros configurados.
    // 'this.http.get<LogAuditoria[]>' indica que a resposta esperada é um array de objetos do tipo LogAuditoria.
    return this.http.get<LogAuditoria[]>(this.API + '/findLogsByCriterio', { params });
  }
}
