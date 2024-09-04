import { Component, inject } from '@angular/core';
import { CarrinhoItemComponent } from './components/carrinho-item/carrinho-item.component';
import { CarrinhoCardComponent } from './components/carrinho-card/carrinho-card.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { LoginService } from '../../auth/login.service';
import { ItemCarrinhoService } from '../../services/item-carrinho.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Carrinho } from '../../models/carrinho';


@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CarrinhoItemComponent, CarrinhoCardComponent, FooterComponent, NavbarComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})

export class CarrinhoComponent {


  loginService = inject(LoginService);
  itemCarrinhoService = inject(ItemCarrinhoService);
  router = inject(Router);

  total: number = 0;
  frete: number = 100;

  carrinhoUser!: Carrinho;//carrinhoUser serve para puxar o carrinho do usuario logado passando pelos filtros do back que filtram o id usuario e o status


  constructor() {
    this.listCarrinhoDoUser();
  }


  listCarrinhoDoUser() {
    if (this.loginService.getUsuarioLogado().idUsuario == null) {
        Swal.fire({
        title: 'Erro',
        text: 'Para acessar o carrinho deve estar logado',
        icon: 'warning',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonText: 'cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
        }
      });
    } else
      this.itemCarrinhoService.getCarrinhoByUser(this.loginService.getUsuarioLogado().idUsuario).subscribe({
        next: carrinho => {
          this.carrinhoUser = carrinho;

          this.total = 0;

          if (carrinho != null)
            for (let i = 0; i < carrinho.itemCarrinho.length; i++) {
              this.total += (carrinho.itemCarrinho[i].valorUnitario * carrinho.itemCarrinho[i].quantProd);
            }

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



  retornoCarrinhoItem(dados: any) {
    if (dados.tipo == 1) { //ioncrementar

      dados.itemCarrinho.quantProd++;
      //estou vinculando a qual carrinho esse item carrinho pertence, senão o item é salvo sem carrinho... e desvincula do usuário
      let carrinhoTemp = new Carrinho();
      carrinhoTemp.idCarrinho = this.carrinhoUser.idCarrinho;
      dados.itemCarrinho.carrinho = carrinhoTemp;
    } else if (dados.tipo == 2) { //decrementar

      dados.itemCarrinho.quantProd--;
      //estou vinculando a qual carrinho esse item carrinho pertence, senão o item é salvo sem carrinho... e desvincula do usuário
      let carrinhoTemp = new Carrinho();
      carrinhoTemp.idCarrinho = this.carrinhoUser.idCarrinho;
      dados.itemCarrinho.carrinho = carrinhoTemp;

    } else if (dados.tipo == 0) { //deletar

      Swal.fire({
        title: 'Tem certeza que deseja deletar este item do carrinho?',
        icon: 'warning',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then((result) => {
        if (result.isConfirmed) {
          this.itemCarrinhoService.delete(dados.itemCarrinho.idItem).subscribe({
            next: mensagem => {
              Swal.fire({
                title: mensagem,
                icon: 'success',
                confirmButtonText: 'Ok',
              });
              this.listCarrinhoDoUser();
            },
            error: erro => {
              Swal.fire({
                title: 'Ocorreu um erro',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          });
        }
      });


    }

    if (dados.tipo == 1 || dados.tipo == 2) {
      this.itemCarrinhoService.update(dados.itemCarrinho, dados.itemCarrinho.idItem).subscribe({
        next: mensagem => {
          this.listCarrinhoDoUser();
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
    }
  }


}
