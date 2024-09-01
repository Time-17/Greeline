import { Component, inject } from '@angular/core';
import { Carrinho } from '../../models/carrinho';
import { CarrinhoService } from '../../services/carrinho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendaslist',
  standalone: true,
  imports: [],
  templateUrl: './vendaslist.component.html',
  styleUrl: './vendaslist.component.scss'
})
export class VendaslistComponent {
  lista: Carrinho[]=[];
  
  carrinhoService = inject(CarrinhoService);

  constructor() {
    this.vendasFinalizadas();
  }
  
  vendasFinalizadas(){
    this.carrinhoService.getVendasFinalizadas().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro =>{
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    })
  }

  delete(carrinho: Carrinho){

    Swal.fire({
      title: "Atenção",
      text: "deseja deletar a venda?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {

      if (result.isConfirmed){
        this.carrinhoService.delete(carrinho.idCarrinho).subscribe({
          next: mensagem => {
            Swal.fire({
              title: "SUCESSO",
              text: mensagem,
              icon: "success",
              confirmButtonText: 'OK',
            });

            this.vendasFinalizadas();
          },
          error: erro =>{
            Swal.fire({
              title: "ERRO",
              text: "Ocorreu um erro inesperado",
              icon: "error",
              confirmButtonText: 'OK',
            });
          }
        });

      }
    });
  }
}
