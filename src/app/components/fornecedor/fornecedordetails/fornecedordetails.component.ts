import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Fornecedor } from '../../../models/fornecedor';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../../services/fornecedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fornecedordetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './fornecedordetails.component.html',
  styleUrl: './fornecedordetails.component.scss'
})
export class FornecedordetailsComponent {

  @Input("fornecedor") fornecedor: Fornecedor = new Fornecedor();
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);


  fornecedorService = inject(FornecedorService);

  constructor(){
    let idFornecedor = this.router.snapshot.params['id'];
    if(idFornecedor > 0){
      this.findById(idFornecedor);
    }else{
      if(this.fornecedor.idFornecedor > 0)
        this.findById(idFornecedor);
    }
  }

  findById(idFornecedor: number){
    this.fornecedorService.findById(idFornecedor).subscribe({
      next: retorno => {
        this.fornecedor = retorno;
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
    if(this.fornecedor.idFornecedor > 0){

      this.fornecedorService.update(this.fornecedor, this.fornecedor.idFornecedor).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/fornecedor'], { state: { fornecedorEditado: this.fornecedor } });
          this.retorno.emit(this.fornecedor);
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

      this.fornecedorService.save(this.fornecedor).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/fornecedor'], { state: { fornecedorNovo: this.fornecedor } });
          this.retorno.emit(this.fornecedor);
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
