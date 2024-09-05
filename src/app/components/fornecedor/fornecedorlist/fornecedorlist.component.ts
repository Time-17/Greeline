import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fornecedor } from '../../../models/fornecedor';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FornecedordetailsComponent } from '../fornecedordetails/fornecedordetails.component';
import { FornecedorService } from '../../../services/fornecedor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-fornecedorlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MdbModalModule, FornecedordetailsComponent],
  templateUrl: './fornecedorlist.component.html',
  styleUrl: './fornecedorlist.component.scss'
})
export class FornecedorlistComponent {

  lista: Fornecedor[] = [];
  fornecedorEdit: Fornecedor = new Fornecedor();


  //
  modalService = inject(MdbModalService);
  @ViewChild("modalFornecedorDetalhe") modalFornecedorDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  //

  fornecedorService = inject(FornecedorService);

  constructor() {
    this.listAll();

    let fornecedorNovo = history.state.fornecedorNovo;
    let fornecedorEditado = history.state.fornecedorEditado;

    if (fornecedorNovo != null) {
      fornecedorNovo.idFornecedor = 555;
      this.lista.push(fornecedorNovo);
    }

    if (fornecedorEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.idFornecedor == fornecedorEditado.idFornecedor;
      });
      this.lista[indice] = fornecedorEditado;
    }
  }


  listAll(){

    this.fornecedorService.listAll().subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: 'Erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  deleteById(fornecedor: Fornecedor) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {


        this.fornecedorService.delete(fornecedor.idFornecedor).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listAll();
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

  new(){
    this.fornecedorEdit = new Fornecedor();
    this.modalRef = this.modalService.open(this.modalFornecedorDetalhe);
  }

  edit(fornecedor: Fornecedor){
    this.fornecedorEdit = Object.assign({}, fornecedor); 
    this.modalRef = this.modalService.open(this.modalFornecedorDetalhe);
  }

  retornoDetalhe(fornecedor: Fornecedor){
    this.listAll();
    this.modalRef.close();
  }
}
