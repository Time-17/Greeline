import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoriasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './categoriasdetails.component.html',
  styleUrl: './categoriasdetails.component.scss'
})
export class CategoriasdetailsComponent {

  @Input("categoria") categoria: Categoria = new Categoria(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  categoriaService = inject(CategoriaService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.categoria.idCategoria > 0)
        this.findById(id);
    }
  }

  findById(id: number){

    this.categoriaService.findById(id).subscribe({
      next: retorno => {
        this.categoria = retorno;
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
    if(this.categoria.idCategoria > 0){

      this.categoriaService.update(this.categoria, this.categoria.idCategoria).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "SUCESSO",
            text: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/categoria'], { state: { categoriaEditado: this.categoria } });
          this.retorno.emit(this.categoria);
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

      this.categoriaService.save(this.categoria).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "SUCESSO",
            text: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/categoria'], { state: { categoriaNovo: this.categoria } });
          this.retorno.emit(this.categoria);
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
