import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Autenticador } from '../../../auth/autenticador';
import { LoginService } from '../../../auth/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink] 
})

export class LoginComponent {
  loginData: Autenticador = new Autenticador() // Certifique-se de que o modelo Usuario está importado corretamente
  erroLogin: boolean = false;
  

  constructor(private loginService: LoginService, public router: Router) {
    loginService.removerToken();
  }

  logar() {
    this.loginService.login(this.loginData).subscribe({
      next: token => {
        console.log(token);
        Swal.fire({
          title: 'Bem vindo',
          icon: 'success',
          confirmButtonText: 'Ok',
        });      
      if(token){
        this.loginService.addToken(token);
      }


            //obs: verificar
      this.router.navigate(['']);
      },
      error: error => {
        Swal.fire({
          title: 'Ocorreu um erro, login inexistente',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
    
  }
}