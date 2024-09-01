import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Produto } from '../../../../models/produto';
@Component({
  selector: 'app-produtos-card',
  standalone: true,
  imports: [],
  templateUrl: './produtos-card.component.html',
  styleUrl: './produtos-card.component.scss'
})

export class ProdutosCardComponent {

  //serve para receber um objeto produto do componente pai
  @Input("produto") produto!: Produto;

  @Output("retorno") retornoProduto = new EventEmitter<any>();

  btnClicked(){
    this.retornoProduto.emit(this.produto);
  }
  
}
