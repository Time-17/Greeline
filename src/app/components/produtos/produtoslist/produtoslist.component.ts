import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produto';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { ProdutosdetailsComponent } from '../produtosdetails/produtosdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-produtoslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ProdutosdetailsComponent],
  templateUrl: './produtoslist.component.html',
  styleUrl: './produtoslist.component.scss'
})
export class ProdutoslistComponent {

  lista: Produto[] = [];
  produtoEdit: Produto = new Produto();

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalProdutoDetalhe") modalProdutosDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  produtosService = inject(ProdutosService);

  listAll(){

    this.produtosService.listAll().subscribe({

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
      
    });
    
  }

  delete(produto: Produto){

    Swal.fire({
      title: "Atenção",
      text: "deseja deletar o produto?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'sim',
      denyButtonText: 'Não',
    }).then((result) => {

      if (result.isConfirmed){
        this.produtosService.delete(produto.idProduto).subscribe({
          next: mensagem => {
            Swal.fire({
              title: "SUCESSO",
              text: mensagem,
              icon: "success",
              confirmButtonText: 'OK',
            });

            this.listAll();
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

  edit(produto: Produto){
    this.produtoEdit = Object.assign({}, produto); //clonando pra evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalProdutosDetalhe);
  }
  
  constructor(){
    this.listAll();

    let produtoNovo = history.state.produtoNovo;
    let produtoEditado = history.state.produtoEditado;

    if (produtoNovo != null) {
      this.lista.push(produtoNovo);
    }

    if (produtoEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.idProduto == produtoEditado.id;
      });
      this.lista[indice] = produtoEditado;
    }
  }
  
  new(){
    this.produtoEdit = new Produto();
    this.modalRef = this.modalService.open(this.modalProdutosDetalhe);
  }

  retornoDetalhe(produto: Produto){
    this.listAll();
    this.modalRef.close();
  }
 
}
