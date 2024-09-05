import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ItemCarrinho } from '../../../../models/item-carrinho';
import { CommonModule } from '@angular/common';
import { ItemCarrinhoService } from '../../../../services/item-carrinho.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrinho-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './carrinho-item.component.html',
  styleUrls: ['./carrinho-item.component.scss']
})
export class CarrinhoItemComponent {

  @Input() itemCarrinho!: ItemCarrinho;
  @Output() retorno = new EventEmitter(); // Emite a contagem de produtos distintos para o componente pai

  itemCarrinhoService = inject(ItemCarrinhoService);

  value: number = 0;

  increment() {
    this.retorno.emit( {tipo: 1, itemCarrinho: this.itemCarrinho} ); // 1: incrementar, 2: decrementar e 0: deletar
  }

  decrement() {
    if(this.itemCarrinho.quantProd == 1)
      this.delete();
    else
      this.retorno.emit( {tipo: 2, itemCarrinho: this.itemCarrinho} ); // 1: incrementar, 2: decrementar e 0: deletar
  }

  delete() {
    this.retorno.emit( {tipo: 0, itemCarrinho: this.itemCarrinho} ); // 1: incrementar, 2: decrementar e 0: deletar

  }
}
