import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ItemCarrinho } from '../../../../models/item-carrinho';
import { CommonModule } from '@angular/common';
import { ItemCarrinhoService } from '../../../../services/item-carrinho.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Carrinho } from '../../../../models/carrinho';
import { LoginService } from '../../../../auth/login.service';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { Login } from '../../../../models/login';

@Component({
  selector: 'app-carrinho-card',
  standalone: true,
  imports: [RouterLink, CommonModule ],
  templateUrl: './carrinho-card.component.html',
  styleUrl: './carrinho-card.component.scss'
})
export class CarrinhoCardComponent {

  carrinhoUser!: Carrinho;

  @Input() total: number = 0;
  @Input() frete: number = 0;

  itemCarrinhoService = inject(ItemCarrinhoService);
  loginService = inject(LoginService);
  carrinhoService = inject(CarrinhoService);
  router = inject(Router)

  save(){
    
    if (this.loginService.getUsuarioLogado() != null){
      this.itemCarrinhoService.getCarrinhoByUser(this.loginService.getUsuarioLogado().idUsuario).subscribe({
        next: carrinho => {
          this.carrinhoUser = carrinho;
          this.finalizarVenda();
        },
        error: erro => {
          Swal.fire({
            title: "ERRO",
            text: "Ocorreu um erro inesperado",
            icon: "error",
            confirmButtonText: 'OK',
          });
        }

      });
    }

   

    
  }

  finalizarVenda(){

    if(this.carrinhoUser != null && this.carrinhoUser.itemCarrinho.length != 0){
      this.carrinhoService.save(this.carrinhoUser).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['produto']);
            }
          });
        },
        error: erro => {
          Swal.fire({
            title: erro,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
    }else{
      Swal.fire({
        title: 'carrinho vazio',
        icon: 'info',
        confirmButtonText: 'Produtos',
        showCancelButton: true,
        cancelButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['produto']);
        }
      });
    }
  }
  
}
