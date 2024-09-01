// src/app/cadastro/cadastro.component.ts
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadastro } from '../../../models/cadastro';
import { CadastroService } from '../../../services/cadastro.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  @Input() cadastro: Cadastro = new Cadastro(0,"","","");
  @Output() retorno = new EventEmitter<any>();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cadastroService = inject(CadastroService);

  constructor() {
    const idUsuario = this.route.snapshot.params['idUsuario'];
    if (idUsuario > 0) {
      this.findById(idUsuario);
    }
  }

  findById(idUsuario: number) {
    this.cadastroService.findById(idUsuario).subscribe({
      next: retorno => {
        this.cadastro = retorno;
      },
      error: erro => {
        alert("Algo deu errado");
      }
    });
  }

  save() {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(this.cadastro.emailUsuario)) {
      Swal.fire({
        title: 'Email inválido',
        text: 'Por favor, insira um email válido.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    
    if (this.cadastro.senhaUsuario === this.cadastro.confirmacaoSenha){
      this.cadastro.role = 'USER';
    this.cadastroService.save(this.cadastro).subscribe({
      next: mensagem => {
        Swal.fire({
          title: 'Usuário cadastrado',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/login']);
      },
      error: erro => {
        alert("Erro aconteceu no save");
      }
    });
  }else {
    Swal.fire({
      title: 'As senhas não coincidem',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
}
}
