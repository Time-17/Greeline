import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';
import Swal from 'sweetalert2';
import { CategoriasdetailsComponent } from '../categoriasdetails/categoriasdetails.component';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-categoriaslist',
  standalone: true,
  imports: [MdbModalModule, RouterLink, CategoriasdetailsComponent],
  templateUrl: './categoriaslist.component.html',
  styleUrl: './categoriaslist.component.scss'
})
export class CategoriaslistComponent {

  lista: Categoria[] = [];
  categoriaEdit: Categoria = new Categoria(0, "");

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalCategoriaDetalhe") modalCategoriaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  categoriaService = inject(CategoriaService);

  listAll(){

    this.categoriaService.listAll().subscribe({

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

  delete(categoria: Categoria){

    Swal.fire({
      title: "Atenção",
      text: "deseja deletar a categoria?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'sim',
      denyButtonText: 'Não',
    }).then((result) => {

      if (result.isConfirmed){
        this.categoriaService.delete(categoria.idCategoria).subscribe({
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

  edit(categoria: Categoria){
    this.categoriaEdit = Object.assign({}, categoria); //clonando pra evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }
  
  constructor(){
    this.listAll();

    let categoriaNovo = history.state.categoriaNovo;
    let categoriaEditado = history.state.categoriaEditado;

    if (categoriaNovo != null) {
      categoriaNovo.id = 9999;
      this.lista.push(categoriaNovo);
    }

    if (categoriaEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.idCategoria == categoriaEditado.id;
      });
      this.lista[indice] = categoriaEditado;
    }
  }
  
  new(){
    this.categoriaEdit = new Categoria(0, "");
    this.modalRef = this.modalService.open(this.modalCategoriaDetalhe);
  }

  retornoDetalhe(categoria: Categoria){
    this.listAll();
    this.modalRef.close();
  }
  
}
