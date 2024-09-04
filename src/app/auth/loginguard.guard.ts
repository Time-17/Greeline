import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginguardGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  let router = inject(Router);

  if(loginService.getUsuarioLogado().role != "ADMIN" && state.url.includes('/admin')){
    alert('Voce nao tem permissao');
    router.navigate(['/home']);
    return false;
  }

  return true;
};
