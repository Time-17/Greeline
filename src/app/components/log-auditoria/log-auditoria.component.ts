import { Component, inject } from '@angular/core';
import { LogAuditoria } from '../../models/log-auditoria';
import { LogAuditoriaService } from '../../services/log-auditoria.service';
import Swal from 'sweetalert2';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';

// import para o calendario
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

// import para o input de ordem
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

//----------
interface Ordem {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-log-auditoria',
  standalone: true,
  imports: [
    MdbAccordionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './log-auditoria.component.html',
  styleUrl: './log-auditoria.component.scss',
})
export class LogAuditoriaComponent {
  // Definimos um objeto público chamado 'params' para armazenar parâmetros usados em buscas de logs.
  public params = {
    // 'range' é um grupo de formulários que contém dois controles para datas (início e fim).
    range: new FormGroup({
      // 'start' é o controle para a data de início do intervalo.
      start: new FormControl<Date | undefined>(undefined),
      // 'end' é o controle para a data de fim do intervalo.
      end: new FormControl<Date | undefined>(undefined),
    }),
    // 'acao', 'roleUsuario', 'logName', 'entity', e 'emailUsuario' são campos que armazenam critérios de busca.
    acao: undefined,
    roleUsuario: undefined,
    logName: undefined,
    entity: undefined,
    emailUsuario: undefined
  }

  // 'logService' é uma instância de LogAuditoriaService, injetada automaticamente.
  logService = inject(LogAuditoriaService);

  // 'logAuditoria' é uma lista onde os logs buscados serão armazenados.
  logAuditoria: LogAuditoria[] = [];

  // 'ordem' define a ordem de ordenação dos logs (crescente ou decrescente).
  ordem: boolean = true;

  // O construtor é executado quando a classe é instanciada.
  constructor() {
    // Chama o método 'listAll' ao criar a instância do componente.
    this.listAll();
  }

  // 'listAll' busca todos os logs disponíveis no serviço.
  listAll() {
    // Chama o método 'listAll' do serviço para buscar todos os logs.
    this.logService.listAll().subscribe({
      // Se a requisição for bem-sucedida, 'next' é chamado com a lista de logs.
      next: (lista) => {
        // Armazena os logs recebidos na variável 'logAuditoria'.
        this.logAuditoria = lista;
      },
      // Se houver um erro na requisição, 'error' é chamado.
      error: (erro) => {
        // Exibe o erro no console.
        console.log('Erro: ', erro);
        // Exibe um alerta na tela informando o erro.
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  // 'sortLog' organiza os logs em ordem crescente ou decrescente com base em 'timestamp'.
  sortLog() {
    // Se 'ordem' for true, organiza em ordem crescente.
    if (this.ordem) {
      console.log('ordem', this.ordem )
      this.logAuditoria.sort(function (a, b) {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
      });
    } else {
      // Caso contrário, organiza em ordem decrescente.
      this.logAuditoria.sort(function (a, b) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      });
    }
    console.log( this.logAuditoria )
  }

  // 'findLogsByCriterio' busca logs com base nos critérios definidos em 'params'.
  findLogsByCriterio() {
    // Chama o serviço para buscar logs com base nos critérios.
    this.logService
      .findLogsByCriterio(
        // Passa a data de início (ou undefined se não for selecionada).
        this.params.range.get('start')?.value || undefined,
        // Passa a data de fim (ou undefined se não for selecionada).
        this.params.range.get('end')?.value || undefined,
        // Passa os outros parâmetros de busca.
        this.params.acao,
        this.params.roleUsuario,
        this.params.logName,
        this.params.entity,
        this.params.emailUsuario
      )
      .subscribe({
        // Se a requisição for bem-sucedida, 'next' é chamado com os logs encontrados.
        next: (data: LogAuditoria[]) => {
          // Armazena os logs encontrados em 'logAuditoria'.
          this.logAuditoria = data;
        },
        // Se houver um erro na requisição, 'error' é chamado.
        error: (error) => {
          // Exibe o erro no console.
          console.error('Erro:', error);
        },
      });
  }
}
