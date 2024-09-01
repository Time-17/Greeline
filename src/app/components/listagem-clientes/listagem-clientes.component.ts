import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Title } from 'chart.js';
import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.scss'
})

export class ListagemClientesComponent {
  lista: Cliente[] = [];

  clienteService = inject(ClienteService);

  listAll() {
    this.clienteService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
        console.log(lista);
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          text: 'Erro ao carregar a lista de clientes',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  constructor(){
    this.listAll();
  }

  // metodo para deletar um cliente. Não necessario para o caso de uso da aplicação
  // delete(cliente: Cliente) {
  //   Swal.fire({
  //     title: 'Atenção',
  //     text: 'Deseja deletar o cliente?',
  //     icon: 'warning',
  //     showConfirmButton: true,
  //     showDenyButton: true,
  //     confirmButtonText: 'Sim',
  //     denyButtonText: 'Não',
  //   }).then((result) => {
  //     if (result.isConfirmed) {


  //       this.clienteService.delete(cliente.idCliente).subscribe({
  //         next: mensagem => {
  //           Swal.fire({
  //             title: 'SUCESSO',
  //             text: mensagem,
  //             icon: 'success',
  //             confirmButtonText: 'OK',
  //           });
  //           this.listAll();
  //         },
  //         error: erro => {
  //           Swal.fire({
  //             title: 'ERRO',
  //             text: 'Ocorreu um erro inesperado',
  //             icon: 'error',
  //             confirmButtonText: 'OK',
  //           });
  //         }
  //       });
  //     }
  //   });
  // }
}
