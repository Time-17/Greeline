import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './produtosdetails.component.html',
  styleUrl: './produtosdetails.component.scss'
})
export class ProdutosdetailsComponent {

  @Input("produto") produto: Produto = new Produto();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  produtosService = inject(ProdutosService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.produto.idProduto > 0)
        this.findById(id);
    }
  }

  findById(id: number){

    this.produtosService.findById(id).subscribe({
      next: retorno => {
        this.produto = retorno;
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

  save(){
    if(this.produto.idProduto > 0){

      this.produtosService.update(this.produto, this.produto.idProduto).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "SUCESSO",
            text: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['produtos'], { state: { produtoEditado: this.produto } });
          this.retorno.emit(this.produto);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    }else{

      this.produtosService.save(this.produto).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "SUCESSO",
            text: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['produtos'], { state: { produtoNovo: this.produto } });
          this.retorno.emit(this.produto);
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
